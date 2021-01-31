import { kindsMapping, opsMapping, types } from './constants.js';
import { SymbolTable } from './SymbolTable.js';

export function generateCode(tokenTree) {
  return tokenTree.elements.flatMap(generateClassCode).join('\n');
}

function generateClassCode(classToken) {
  const className = classToken.elements.find(x => x.name === types.identifier)
    .value;

  const symbolTable = new SymbolTable();
  addClassSymbols(classToken, { symbolTable });

  const subroutineDecs = classToken.elements.filter(
    e => e.name === types.subroutineDec,
  );

  const subroutineDecsCode = subroutineDecs.flatMap(subroutineDec =>
    generateSubroutineDecCode(subroutineDec, {
      className,
      symbolTable: new SymbolTable(symbolTable),
    }),
  );

  return subroutineDecsCode;
}

function addClassSymbols(classToken, context) {
  const classVarDecs = classToken.elements.filter(
    e => e.name === types.classVarDec,
  );

  addVarDecs(classVarDecs, context);
}

function addVarDecs(varDecs, context) {
  for (const varDec of varDecs) {
    const symbol = createSymbol(varDec);
    context.symbolTable.add(symbol);
    for (let i = 4; i < varDec.elements.length; i += 2) {
      context.symbolTable.add({ ...symbol, name: varDec.elements[i].value });
    }
  }
}

function createSymbol(varDec) {
  return {
    kind: varDec.elements[0].value,
    type: varDec.elements[1].value,
    name: varDec.elements[2].value,
  };
}

function addParameterListSymbols(parameterList, context) {
  for (let i = 0; i < parameterList.elements.length; i += 3) {
    context.symbolTable.add({
      kind: 'argument',
      type: parameterList.elements[i].value,
      name: parameterList.elements[i + 1].value,
    });
  }
}

function generateSubroutineDecCode(subroutineDec, context) {
  switch (subroutineDec.elements[0].value) {
    case 'constructor':
      return generateConstructorCode(subroutineDec, context);
    case 'function':
      return generateFunctionCode(subroutineDec, context);
    case 'method':
      return generateMethodCode(subroutineDec, context);
  }
}

function generateGenericSubroutineCode(subroutineDec, context) {
  const parameterList = subroutineDec.elements.find(
    e => e.name === types.parameterList,
  );
  addParameterListSymbols(parameterList, context);

  const subroutineBody = subroutineDec.elements.find(
    e => e.name === types.subroutineBody,
  );

  const subroutineName = subroutineDec.elements[2].value;

  return [
    `function ${context.className}.${subroutineName}`,
    ...context.bootstrapCode,
    ...generateSubroutineBodyCode(subroutineBody, context),
    '',
  ];
}

function generateConstructorCode(subroutineDec, context) {
  const bootstrapCode = [
    `push ${context.symbolTable.variables.size}`,
    'call Memory.alloc 1',
    'pop pointer 0',
  ];
  return generateGenericSubroutineCode(subroutineDec, {
    ...context,
    bootstrapCode,
    isConstructor: true,
  });
}

function generateFunctionCode(subroutineDec, context) {
  const bootstrapCode = [];
  return generateGenericSubroutineCode(subroutineDec, {
    ...context,
    bootstrapCode,
  });
}

function generateMethodCode(subroutineDec, context) {
  const bootstrapCode = ['push argument 0', 'pop pointer 0'];
  return generateGenericSubroutineCode(subroutineDec, {
    ...context,
    bootstrapCode,
  });
}

function generateSubroutineBodyCode(subroutineBody, context) {
  addSubroutineBodySymbols(subroutineBody, context);
  const statements = subroutineBody.elements.find(
    e => e.name === types.statements,
  );
  return generateStatementsCode(statements, context);
}

function addSubroutineBodySymbols(subroutineBody, context) {
  const varDecs = subroutineBody.elements.filter(e => e.name === types.varDec);
  addVarDecs(varDecs, context);
}

function generateStatementsCode(statements, context) {
  return statements.elements.flatMap(statement =>
    generateStatementCode(statement, context),
  );
}

function generateStatementCode(statement, context) {
  switch (statement.name) {
    case types.letStatement:
      return generateLetStatementCode(statement, context);
    case types.ifStatement:
      return generateIfStatementCode(statement, context);
    case types.whileStatement:
      return generateWhileStatementCode(statement, context);
    case types.doStatement:
      return generateDoStatementCode(statement, context);
    case types.returnStatement:
      return generateReturnStatementCode(statement, context);
    default:
      throw new Error('Incorrect statement type');
  }
}

function generateLetStatementCode(statement, context) {
  const varName = statement.elements.find(e => e.name === types.identifier)
    .value;
  const varNameCode = getVarNameCode(varName, context, 'pop');
  const equalsSign = statement.elements.findIndex(
    e => e.name === types.symbol && e.value === '=',
  );
  const rightExpression = statement.elements[equalsSign + 1];
  const rightExpressionCode = generateExpressionCode(rightExpression, context);

  const leftBracketIndex = statement.elements.findIndex(
    e => e.name === types.symbol && e.value === '[',
  );

  if (leftBracketIndex === -1) {
    return [
      `// let ${varName} statement`,
      ...rightExpressionCode,
      ...varNameCode,
      '',
    ];
  }

  const leftExpression = statement.elements[leftBracketIndex + 1];
  const leftExpressionCode = generateExpressionCode(leftExpression, context);

  return [
    `// let ${varName} statement with an array`,
    ...rightExpressionCode,
    ...leftExpressionCode,
    getVarNameCode(varName, context, 'push'),
    'add',
    'pop pointer 1',
    'pop that 0',
    '',
  ];
}

function getVarNameCode(varName, context, operation) {
  const symbol = context.symbolTable.get(varName);
  let code = [];
  if (symbol.kind === 'field' && !context.isConstructor) {
    code = ['push argument 0', 'pop pointer 0'];
  }

  return [...code, `${operation} ${kindsMapping[symbol.kind]} ${symbol.index}`];
}

function generateIfStatementCode(statement, context) {
  const expression = statement.elements.find(e => e.name === types.expression);
  const expressionCode = generateExpressionCode(expression, context);

  const ifStatements = statement.elements.find(
    e => e.name === types.statements,
  );
  const ifStatementsCode = generateStatementsCode(ifStatements, context);

  const elseKeywordIndex = statement.elements.findIndex(
    e => e.name === types.elseKeyword,
  );

  let elseStatementsCode =
    elseKeywordIndex > 0
      ? generateStatementsCode(
          statement.elements[elseKeywordIndex + 2],
          context,
        )
      : [];

  const ifLabel = `IF_${statement.index}`;
  const elseLabel = `ELSE_${statement.index}`;

  return [
    '// if',
    ...expressionCode,
    'not',
    `if-goto ${ifLabel}`,
    ...ifStatementsCode,
    `goto ${elseLabel}`,
    `label ${ifLabel}`,
    ...elseStatementsCode,
    `label ${elseLabel}`,
    '',
  ];
}

function generateWhileStatementCode(statement, context) {
  const expression = statement.elements.find(e => e.name === types.expression);
  const expressionCode = generateExpressionCode(expression, context);

  const statements = statement.elements.find(e => e.name === types.statements);
  const statementsCode = generateStatementsCode(statements, context);

  const whileLabel = `WHILE_${statement.index}`;
  const whileBreakLabel = `WHILE_BREAK_${statement.index}`;

  return [
    '// while',
    `label ${whileLabel}`,
    ...expressionCode,
    'not',
    `if-goto ${whileBreakLabel}`,
    ...statementsCode,
    `goto ${whileLabel}`,
    `label ${whileBreakLabel}`,
    '',
  ];
}

function generateDoStatementCode(statement, context) {
  const subroutineCall = statement.elements.find(
    e => e.name === types.subroutineCall,
  );
  const subroutineCallCode = generateSubroutineCallCode(
    subroutineCall,
    context,
  );

  return [...subroutineCallCode, 'pop temp 0'];
}

function generateReturnStatementCode(statement, context) {
  const expression = statement.elements.find(e => e.name === types.expression);
  const expressionCode = expression
    ? generateExpressionCode(expression, context)
    : ['push constant 0'];

  return [...expressionCode, 'return', '\n'];
}

function generateExpressionCode(expression, context) {
  const term = expression.elements.find(e => e.name === types.term);
  const termCode = generateTermCode(term, context);

  const terms = [...termCode];

  for (let i = 1; i < expression.elements.length - 1; i += 2) {
    const op = expression.elements[i].value;
    const nextTerm = expression.elements[i + 1];
    const nextTermCode = generateTermCode(nextTerm, context);
    terms.push(...nextTermCode, opsMapping[op], '');
  }

  return terms;
}

function generateTermCode(term, context) {
  const token = term.elements[0];

  if (token.name === types.integerConstant) {
    return [`push constant ${token.value}`];
  }

  if (token.name === types.stringConstant) {
    return [
      `// "${token.value}"`,
      'call String.new 0',
      'pop temp 0',
      ...token.value
        .split('')
        .flatMap(ch => [
          'push temp 0',
          `push constant ${ch.charCodeAt(0)}`,
          'call String.appendChar 2',
        ]),
      '',
    ];
  }

  if (token.name === types.keyword) {
    if (token.value === 'true') {
      return [`// ${token.value}`, 'push constant 1', 'neg'];
    }

    if (token.value === 'this') {
      if (context.isConstructor) {
        return [`// ${token.value}`, 'push pointer 0'];
      }
      return [`// ${token.value}`, 'push argument 0'];
    }

    if (['false', 'null'].includes(token.value)) {
      return [`// ${token.value}`, 'push constant 0'];
    }
  }

  if (token.name === types.symbol && token.value === '(') {
    return generateExpressionCode(term.elements[1], context);
  }

  if (token.name === types.symbol && token.value === '~') {
    return [...generateTermCode(term.elements[1], context), 'not'];
  }

  if (token.name === types.symbol && token.value === '-') {
    return [...generateTermCode(term.elements[1], context), 'neg'];
  }

  if (token.name === types.subroutineCall) {
    return generateSubroutineCallCode(token, context);
  }

  if (token.name === types.identifier) {
    if (!term.elements[1]) {
      return getVarNameCode(token.value, context, 'push');
    }
  }

  const expression = term.elements[2];
  const expressionCode = generateExpressionCode(expression, context);

  return [
    ...getVarNameCode(token.value, context, 'push'),
    ...expressionCode,
    'add',
    'pop pointer 1',
    'push that 0',
    '',
  ];
}

function generateSubroutineCallCode(subroutineCall, context) {
  const token = subroutineCall.elements[0];
  const symbol = context.symbolTable.get(token.value);
  const dot = subroutineCall.elements.findIndex(
    e => e.name === types.symbol && e.value === '.',
  );
  let code = [];
  let functionName = '';
  let argumentsCount = 0;
  if (dot < 0) {
    code = ['push argument 0'];
    functionName = `${context.className}.${subroutineCall.elements[0].value}`;
    argumentsCount = 1;
  } else if (symbol) {
    code = getVarNameCode(token.value, context, 'push');
    functionName = `${symbol.type}.${subroutineCall.elements[2].value}`;
    argumentsCount = 1;
  } else {
    functionName = `${subroutineCall.elements[0].value}.${subroutineCall.elements[2].value}`;
  }

  const expressionList = subroutineCall.elements.find(
    e => e.name === types.expressionList,
  );
  const expressionListCode = generateExpressionListCode(
    expressionList,
    context,
  );

  argumentsCount += expressionListCode.length;

  return [
    `// call ${functionName} ${argumentsCount}`,
    ...code,
    '// expressionList',
    ...expressionListCode.flat(),
    `call ${functionName} ${argumentsCount}`,
    '',
  ];
}

function generateExpressionListCode(expressionList, context) {
  const code = [];
  for (let i = 0; i < expressionList.elements.length; i += 2) {
    code.push(generateExpressionCode(expressionList.elements[i], context));
  }

  return code;
}
