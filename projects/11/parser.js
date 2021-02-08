import {
  types,
  dataTypes,
  staticOrFieldTypes,
  subroutineTypes,
  ops,
  unaryOps,
  keywordConsts,
  nodeTypes,
} from './constants.js';

export function parse(tokens) {
  return {
    elements: [parseClass(tokens)],
  };
}

function parseClass(tokens) {
  if (!tokens || tokens.length < 4) {
    return;
  }

  let tokenIndex = 0;

  const keyword = tokens[tokenIndex++];
  const className = tokens[tokenIndex++];
  const openParenthesis = tokens[tokenIndex++];

  if (
    keyword.name !== types.keyword ||
    keyword.value !== types.class ||
    openParenthesis.name !== types.symbol ||
    openParenthesis.value !== '{'
  ) {
    return;
  }

  const classVarDecs = parseClassVarDecs(tokens.slice(tokenIndex));
  tokenIndex += classVarDecs.length;
  const subroutineDecs = parseSubroutineDecs(tokens.slice(tokenIndex));
  tokenIndex += subroutineDecs.length;
  const closeParenthesis = tokens[tokenIndex++];
  if (
    !closeParenthesis ||
    closeParenthesis.name !== types.symbol ||
    closeParenthesis.value !== '}'
  ) {
    return;
  }

  return {
    name: types.class,
    type: nodeTypes.element,
    elements: [
      keyword,
      className,
      openParenthesis,
      ...classVarDecs.elements,
      ...subroutineDecs.elements,
      closeParenthesis,
    ],
    length: tokenIndex,
  };
}

function parseClassVarDecs(tokens) {
  return genericParseList(tokens, parseClassVarDec);
}

function parseVarDecs(tokens) {
  return genericParseList(tokens, parseVarDec);
}

function genericParseList(tokens, parseFuntion) {
  const result = {
    elements: [],
    length: 0,
  };
  while (result.length < tokens.length) {
    const parsedToken = parseFuntion(tokens.slice(result.length));
    if (!parsedToken) {
      break;
    }
    result.elements.push(parsedToken);
    result.length += parsedToken.length;
  }

  return result;
}

function parseClassVarDec(tokens) {
  return genericParseVarDec(tokens, staticOrFieldTypes, types.classVarDec);
}

function parseVarDec(tokens) {
  return genericParseVarDec(tokens, ['var'], types.varDec);
}

function genericParseVarDec(tokens, validKeywords, resultType) {
  if (!tokens || tokens.length < 4) {
    return;
  }

  let tokenIndex = 0;

  const keyword = tokens[tokenIndex++];
  const type = tokens[tokenIndex++];
  const varName = tokens[tokenIndex++];

  if (
    keyword.name !== types.keyword ||
    !validKeywords.includes(keyword.value) ||
    !validateType(type) ||
    varName.name !== types.identifier
  ) {
    return;
  }

  const varNames = [];
  while (tokenIndex < tokens.length - 2) {
    const first = tokens[tokenIndex];
    const second = tokens[tokenIndex + 1];
    if (
      first.name !== types.symbol ||
      first.value !== ',' ||
      second.name !== types.identifier
    ) {
      break;
    }
    tokenIndex += 2;
    varNames.push(first, second);
  }

  const semicolon = tokens[tokenIndex++];
  if (
    !semicolon ||
    semicolon.name !== types.symbol ||
    semicolon.value !== ';'
  ) {
    return;
  }

  return {
    name: resultType,
    type: nodeTypes.element,
    elements: [keyword, type, varName, ...varNames, semicolon],
    length: tokenIndex,
  };
}

function validateType(type) {
  if (!type) {
    return false;
  }

  if (
    (type.name == types.keyword && dataTypes.includes(type.value)) ||
    type.name === types.identifier
  ) {
    return true;
  }

  return false;
}

function parseSubroutineDecs(tokens) {
  return genericParseList(tokens, parseSubroutineDec);
}

function parseSubroutineDec(tokens) {
  if (!tokens || tokens.length < 7) {
    return;
  }

  let tokenIndex = 0;

  const subroutineType = tokens[tokenIndex++];
  const type = tokens[tokenIndex++];
  const subroutineName = tokens[tokenIndex++];
  const leftParenthesis = tokens[tokenIndex++];

  if (
    subroutineType.name !== types.keyword ||
    !subroutineTypes.includes(subroutineType.value) ||
    !validateType(type) ||
    subroutineName.name !== types.identifier ||
    leftParenthesis.name !== types.symbol ||
    leftParenthesis.value !== '('
  ) {
    return;
  }

  const parameterList = parseParameterList(tokens.slice(tokenIndex));
  tokenIndex += parameterList.length;
  const rightParenthesis = tokens[tokenIndex++];

  if (
    rightParenthesis.name !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  const subroutineBody = parseSubroutineBody(tokens.slice(tokenIndex));
  if (!subroutineBody) return;
  tokenIndex += subroutineBody.length;

  return {
    name: types.subroutineDec,
    type: nodeTypes.element,
    elements: [
      subroutineType,
      type,
      subroutineName,
      leftParenthesis,
      parameterList,
      rightParenthesis,
      subroutineBody,
    ],
    length: tokenIndex,
  };
}

function parseParameterList(tokens) {
  const type = tokens[0];
  const varName = tokens[1];
  const result = {
    name: types.parameterList,
    type: nodeTypes.element,
    elements: [],
    length: 0,
  };
  if (!validateType(type) || !varName || varName.name !== types.identifier) {
    return result;
  }

  result.elements.push(type, varName);
  result.length += 2;

  while (result.length < tokens.length - 3) {
    const first = tokens[result.length];
    const second = tokens[result.length + 1];
    const third = tokens[result.length + 2];
    if (
      first.name !== types.symbol ||
      first.value !== ',' ||
      !validateType(second) ||
      third.name !== types.identifier
    ) {
      break;
    }
    result.length += 3;
    result.elements.push(first, second, third);
  }

  return result;
}

function parseSubroutineBody(tokens) {
  if (!tokens || tokens.length < 2) {
    return;
  }

  let tokenIndex = 0;

  const leftParenthesis = tokens[tokenIndex++];
  if (leftParenthesis.name !== types.symbol || leftParenthesis.value !== '{') {
    return;
  }

  const varDecs = parseVarDecs(tokens.slice(tokenIndex));
  tokenIndex += varDecs.length;
  const statements = parseStatements(tokens.slice(tokenIndex));
  tokenIndex += statements.length;
  const rightParenthesis = tokens[tokenIndex++];

  if (
    rightParenthesis.name !== types.symbol ||
    rightParenthesis.value !== '}'
  ) {
    return;
  }

  return {
    name: types.subroutineBody,
    type: nodeTypes.element,
    elements: [
      leftParenthesis,
      ...varDecs.elements,
      statements,
      rightParenthesis,
    ],
    length: tokenIndex,
  };
}

function parseStatements(tokens) {
  const result = genericParseList(tokens, parseStatement);
  result.name = types.statements;
  result.type = nodeTypes.element;
  return result;
}

function parseStatement(tokens) {
  return (
    parseLetStatement(tokens) ||
    parseIfStatement(tokens) ||
    parseWhileStatement(tokens) ||
    parseDoStatement(tokens) ||
    parseReturnStatement(tokens)
  );
}

function parseLetStatement(tokens) {
  if (!tokens || tokens.length < 3) {
    return;
  }

  let tokenIndex = 0;
  const letKeyword = tokens[tokenIndex++];
  const varName = tokens[tokenIndex++];
  if (
    letKeyword.name !== types.keyword ||
    letKeyword.value !== 'let' ||
    varName.name !== types.identifier
  ) {
    return;
  }

  const expressionTokens = [];
  const token = tokens[tokenIndex];
  if (token.name == types.symbol && token.value === '[') {
    tokenIndex++;
    const expression = parseExpression(tokens.slice(tokenIndex));
    if (!expression) return;
    tokenIndex += expression.length;
    const rightParenthesis = tokens[tokenIndex++];
    if (
      rightParenthesis.name !== types.symbol ||
      rightParenthesis.value !== ']'
    ) {
      return;
    }
    expressionTokens.push(token, expression, rightParenthesis);
  }

  const equalsSign = tokens[tokenIndex++];
  if (equalsSign.name !== types.symbol || equalsSign.value !== '=') {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  if (!expression) return;
  tokenIndex += expression.length;
  const semicolon = tokens[tokenIndex++];

  if (semicolon.name !== types.symbol || semicolon.value !== ';') {
    return;
  }

  return {
    name: types.letStatement,
    type: nodeTypes.element,
    elements: [
      letKeyword,
      varName,
      ...expressionTokens,
      equalsSign,
      expression,
      semicolon,
    ],
    length: tokenIndex,
  };
}

function parseIfStatement(tokens) {
  const ifTokens = genericParseStatement(tokens, 'if', types.ifStatement);
  if (!ifTokens) return;

  let tokenIndex = ifTokens.length;

  const token = tokens[tokenIndex];
  let elseTokens = [];
  if (token.name === types.keyword && token.value === 'else') {
    tokenIndex++;
    const leftBracket = tokens[tokenIndex++];
    if (leftBracket.name !== types.symbol || leftBracket.value !== '{') {
      return;
    }

    const statements = parseStatements(tokens.slice(tokenIndex));
    tokenIndex += statements.length;

    const rightBracket = tokens[tokenIndex++];
    if (rightBracket.name !== types.symbol || rightBracket.value !== '}') {
      return;
    }

    elseTokens = [token, leftBracket, statements, rightBracket];
  }

  return {
    name: types.ifStatement,
    type: nodeTypes.element,
    elements: [...ifTokens.elements, ...elseTokens],
    length: tokenIndex,
  };
}

function parseWhileStatement(tokens) {
  return genericParseStatement(tokens, 'while', types.whileStatement);
}

function genericParseStatement(tokens, keyword, resultType) {
  if (!tokens || tokens.length < 5) {
    return;
  }

  let tokenIndex = 0;
  const keywordToken = tokens[tokenIndex++];
  const leftParenthesis = tokens[tokenIndex++];
  if (
    keywordToken.name !== types.keyword ||
    keywordToken.value !== keyword ||
    leftParenthesis.name !== types.symbol ||
    leftParenthesis.value !== '('
  ) {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightParenthesis = tokens[tokenIndex++];
  const leftBracket = tokens[tokenIndex++];

  if (
    rightParenthesis.name !== types.symbol ||
    rightParenthesis.value !== ')' ||
    leftBracket.name !== types.symbol ||
    leftBracket.value !== '{'
  ) {
    return;
  }

  const statements = parseStatements(tokens.slice(tokenIndex));
  tokenIndex += statements.length;

  const rightBracket = tokens[tokenIndex++];
  if (rightBracket.name !== types.symbol || rightBracket.value !== '}') {
    return;
  }

  return {
    name: resultType,
    type: nodeTypes.element,
    elements: [
      keywordToken,
      leftParenthesis,
      expression,
      rightParenthesis,
      leftBracket,
      statements,
      rightBracket,
    ],
    length: tokenIndex,
  };
}

function parseDoStatement(tokens) {
  if (!tokens || tokens.length < 2) {
    return;
  }

  let tokenIndex = 0;
  const doKeyword = tokens[tokenIndex++];
  if (doKeyword.name !== types.keyword || doKeyword.value !== 'do') {
    return;
  }

  const subroutineCall = parseSubroutineCall(tokens.slice(tokenIndex));
  if (!subroutineCall) return;
  tokenIndex += subroutineCall.length;
  const semicolon = tokens[tokenIndex++];

  if (semicolon.name !== types.symbol || semicolon.value !== ';') {
    return;
  }

  return {
    name: types.doStatement,
    type: nodeTypes.element,
    elements: [doKeyword, subroutineCall, semicolon],
    length: tokenIndex,
  };
}

function parseReturnStatement(tokens) {
  if (!tokens || tokens.length < 2) {
    return;
  }

  let tokenIndex = 0;
  const returnKeyword = tokens[tokenIndex++];
  if (
    returnKeyword.name !== types.keyword ||
    returnKeyword.value !== 'return'
  ) {
    return;
  }

  let expression = [];
  const token = tokens[tokenIndex];
  if (token.name !== types.symbol || token.value !== ';') {
    expression = [parseExpression(tokens.slice(tokenIndex))];
    tokenIndex += expression[0].length;
  }

  const semicolon = tokens[tokenIndex++];

  return {
    name: types.returnStatement,
    type: nodeTypes.element,
    elements: [returnKeyword, ...expression, semicolon],
    length: tokenIndex,
  };
}

function parseExpression(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  const term = parseTerm(tokens);
  if (!term) return;
  let tokenIndex = term.length;
  const opTerms = [];
  while (tokenIndex < tokens.length - 1) {
    const op = tokens[tokenIndex];
    const term2 = parseTerm(tokens.slice(tokenIndex + 1));
    if (op.name !== types.symbol || !ops.includes(op.value) || !term2) {
      break;
    }
    tokenIndex += term2.length + 1;
    opTerms.push(op, term2);
  }

  return {
    name: types.expression,
    type: nodeTypes.element,
    elements: [term, ...opTerms],
    length: tokenIndex,
  };
}

function parseTerm(tokens) {
  const term =
    parseIntegerConstant(tokens) ||
    parseStringConstant(tokens) ||
    parseKeywordConstant(tokens) ||
    parseSubroutineCall(tokens) ||
    parseVarName(tokens) ||
    parseParenthesizedExpression(tokens) ||
    parseUnaryOpTerm(tokens);

  if (!term) return;

  return {
    name: types.term,
    type: nodeTypes.element,
    elements: term.name ? [term] : term.elements,
    length: term.length,
  };
}

function isEmpty(tokens) {
  return !tokens || tokens.length === 0;
}

function createSingleToken(token) {
  return { ...token, length: 1 };
}

function createSingleTokenIfMatchesType(token, type) {
  return token.name === type ? createSingleToken(token) : undefined;
}

function parseIntegerConstant(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  const token = tokens[0];
  return createSingleTokenIfMatchesType(token, types.integerConstant);
}

function parseStringConstant(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  const token = tokens[0];
  return createSingleTokenIfMatchesType(token, types.stringConstant);
}

function parseKeywordConstant(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  const token = tokens[0];
  if (!keywordConsts.includes(token.value)) {
    return;
  }
  return createSingleTokenIfMatchesType(token, types.keyword);
}

function parseVarName(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const token = tokens[tokenIndex++];
  if (token.name !== types.identifier) return;

  const leftBracket = tokens[tokenIndex++];
  if (leftBracket.name !== types.symbol || leftBracket.value !== '[') {
    return createSingleToken(token);
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightBracket = tokens[tokenIndex++];
  if (rightBracket.name !== types.symbol || rightBracket.value !== ']') {
    return;
  }

  return {
    elements: [token, leftBracket, expression, rightBracket],
    length: tokenIndex,
  };
}

function parseParenthesizedExpression(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const leftParenthesis = tokens[tokenIndex++];
  if (leftParenthesis.name !== types.symbol || leftParenthesis.value !== '(') {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightParenthesis = tokens[tokenIndex++];
  if (
    rightParenthesis.name !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  return {
    elements: [leftParenthesis, expression, rightParenthesis],
    length: tokenIndex,
  };
}

function parseUnaryOpTerm(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const unaryOp = tokens[tokenIndex++];
  if (unaryOp.name !== types.symbol || !unaryOps.includes(unaryOp.value)) {
    return;
  }

  const term = parseTerm(tokens.slice(tokenIndex));
  tokenIndex += term.length;

  return { elements: [unaryOp, term], length: tokenIndex };
}

function parseSubroutineCall(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  let subroutineName = tokens[tokenIndex++];
  let leftParenthesis = tokens[tokenIndex++];
  if (
    subroutineName.name !== types.identifier ||
    leftParenthesis.name !== types.symbol
  ) {
    return;
  }

  const prefixTokens = [];
  if (leftParenthesis.value === '.') {
    const classNameOrVarName = subroutineName;
    const dot = leftParenthesis;
    prefixTokens.push(classNameOrVarName, dot);
    subroutineName = tokens[tokenIndex++];
    leftParenthesis = tokens[tokenIndex++];
  }

  if (leftParenthesis.value !== '(') {
    return;
  }

  const expressionList = parseExpressionList(tokens.slice(tokenIndex));
  tokenIndex += expressionList.length;

  const rightParenthesis = tokens[tokenIndex++];

  if (
    rightParenthesis.name !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  return {
    name: types.subroutineCall,
    type: nodeTypes.element,
    elements: [
      ...prefixTokens,
      subroutineName,
      leftParenthesis,
      expressionList,
      rightParenthesis,
    ],
    length: tokenIndex,
  };
}

function parseExpressionList(tokens) {
  const result = {
    name: types.expressionList,
    type: nodeTypes.element,
    elements: [],
    length: 0,
  };

  if (!tokens || tokens.length === 0) {
    return result;
  }

  const expression = parseExpression(tokens);
  if (!expression) {
    return result;
  }
  result.length += expression.length;
  result.elements.push(expression);

  while (result.length < tokens.length - 1) {
    const first = tokens[result.length];
    const second = parseExpression(tokens.slice(result.length + 1));
    if (first.name !== types.symbol || first.value !== ',' || !second) {
      break;
    }
    result.length += second.length + 1;
    result.elements.push(first, second);
  }

  return result;
}
