import {
  types,
  dataTypes,
  staticOrFieldTypes,
  subroutineTypes,
  ops,
  unaryOps,
} from './constants.js';

export function parse(tokens) {
  return parseClass(tokens);
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
    keyword.type !== types.keyword ||
    keyword.value !== types.class ||
    openParenthesis.type !== types.symbol ||
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
    closeParenthesis.type !== types.symbol ||
    closeParenthesis.value !== '}'
  ) {
    return;
  }

  return {
    type: types.class,
    children: [
      keyword,
      className,
      openParenthesis,
      ...classVarDecs.children,
      ...subroutineDecs.children,
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
    children: [],
    length: 0,
  };
  while (result.length < tokens.length) {
    const parsedToken = parseFuntion(tokens.slice(result.length));
    if (!parsedToken) {
      break;
    }
    result.children.push(parsedToken);
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
    keyword.type !== types.keyword ||
    !validKeywords.includes(keyword.value) ||
    !validateType(type) ||
    varName.type !== types.identifier
  ) {
    return;
  }

  const varNames = [];
  while (tokenIndex < tokens.length - 2) {
    const first = tokens[tokenIndex];
    const second = tokens[tokenIndex + 1];
    if (
      first.type !== types.symbol ||
      first.value !== ',' ||
      second.type !== types.identifier
    ) {
      break;
    }
    tokenIndex += 2;
    varNames.push(first, second);
  }

  const semicolon = tokens[tokenIndex++];
  if (
    !semicolon ||
    semicolon.type !== types.symbol ||
    semicolon.value !== ';'
  ) {
    return;
  }

  return {
    type: resultType,
    children: [keyword, type, varName, ...varNames, semicolon],
    length: tokenIndex,
  };
}

function validateType(type) {
  if (!type) {
    return false;
  }

  if (
    (type.type == types.keyword && dataTypes.includes(type.value)) ||
    type.type === types.identifier
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
    subroutineType.type !== types.keyword ||
    !subroutineTypes.includes(subroutineType.value) ||
    !validateType(type) ||
    subroutineName.type !== types.identifier ||
    leftParenthesis.type !== types.symbol ||
    leftParenthesis.value !== '('
  ) {
    return;
  }

  const parameterList = parseParameterList(tokens.slice(tokenIndex));
  tokenIndex += parameterList.length;
  const rightParenthesis = tokens[tokenIndex++];

  if (
    rightParenthesis.type !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  const subroutineBody = parseSubroutineBody(tokens.slice(tokenIndex));
  if (!subroutineBody) return;
  tokenIndex += subroutineBody.length;

  return {
    type: types.subroutineDec,
    children: [
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
  let tokenIndex = 0;
  const type = tokens[tokenIndex++];
  const varName = tokens[tokenIndex++];
  if (!validateType(type) || !varName || varName.type !== types.identifier) {
    return {
      type: types.parameterList,
      children: [],
      length: 0,
    };
  }

  const children = [];
  while (tokenIndex < tokens.length - 3) {
    const first = tokens[tokenIndex];
    const second = tokens[tokenIndex + 1];
    const third = tokens[tokenIndex + 2];
    if (
      first.type !== types.symbol ||
      first.value !== ',' ||
      !validateType(second) ||
      third.type !== types.identifier
    ) {
      break;
    }
    tokenIndex += 3;
    children.push(first, second, third);
  }

  return {
    type: types.parameterList,
    children,
    length: tokenIndex,
  };
}

function parseSubroutineBody(tokens) {
  if (!tokens || tokens.length < 2) {
    return;
  }

  let tokenIndex = 0;

  const leftParenthesis = tokens[tokenIndex++];
  if (leftParenthesis.type !== types.symbol || leftParenthesis.value !== '{') {
    return;
  }

  const varDecs = parseVarDecs(tokens.slice(tokenIndex));
  tokenIndex += varDecs.length;
  const statements = parseStatements(tokens.slice(tokenIndex));
  tokenIndex += statements.length;
  const rightParenthesis = tokens[tokenIndex++];

  if (
    rightParenthesis.type !== types.symbol ||
    rightParenthesis.value !== '}'
  ) {
    return;
  }

  return {
    type: types.subroutineBody,
    children: [
      leftParenthesis,
      ...varDecs.children,
      statements,
      rightParenthesis,
    ],
    length: tokenIndex,
  };
}

function parseStatements(tokens) {
  const result = genericParseList(tokens, parseStatement);
  result.type = types.statements;
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
    letKeyword.type !== types.keyword ||
    letKeyword.value !== 'let' ||
    varName.type !== types.identifier
  ) {
    return;
  }

  const expressionTokens = [];
  const token = tokens[tokenIndex];
  if (token.type == types.symbol && token.value === '[') {
    tokenIndex++;
    const expression = parseExpression(tokens.slice(tokenIndex));
    if (!expression) return;
    tokenIndex += expression.length;
    const rightParenthesis = tokens[tokenIndex++];
    if (
      rightParenthesis.type !== types.symbol ||
      rightParenthesis.value !== ']'
    ) {
      return;
    }
    expressionTokens.push(token, expression, rightParenthesis);
  }

  const equalsSign = tokens[tokenIndex++];
  if (equalsSign.type !== types.symbol || equalsSign.value !== '=') {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  if (!expression) return;
  tokenIndex += expression.length;
  const semicolon = tokens[tokenIndex++];

  if (semicolon.type !== types.symbol || semicolon.value !== ';') {
    return;
  }

  return {
    type: types.letStatement,
    children: [
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
  if (token.type === types.keyword && token.value === 'else') {
    tokenIndex++;
    const leftBracket = tokens[tokenIndex++];
    if (leftBracket.type !== types.symbol || leftBracket.value !== '(') {
      return;
    }

    const statements = parseStatements(tokens.slice(tokenIndex));
    tokenIndex += statements.length;

    const rightBracket = tokens[tokenIndex++];
    if (rightBracket.type !== types.symbol || rightBracket.value !== '}') {
      return;
    }

    elseTokens = [leftBracket, statements, rightBracket];
  }

  return {
    type: types.ifStatement,
    children: [...ifTokens.children, ...elseTokens],
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
    keywordToken.type !== types.keyword ||
    keywordToken.value !== keyword ||
    leftParenthesis.type !== types.symbol ||
    leftParenthesis.value !== '('
  ) {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightParenthesis = tokens[tokenIndex++];
  const leftBracket = tokens[tokenIndex++];

  if (
    rightParenthesis.type !== types.symbol ||
    rightParenthesis.value !== ')' ||
    leftBracket.type !== types.symbol ||
    leftBracket.value !== '{'
  ) {
    return;
  }

  const statements = parseStatements(tokens.slice(tokenIndex));
  tokenIndex += statements.length;

  const rightBracket = tokens[tokenIndex++];
  if (rightBracket.type !== types.symbol || rightBracket.value !== '}') {
    return;
  }

  return {
    type: resultType,
    children: [
      keywordToken,
      leftParenthesis,
      expression,
      rightParenthesis,
      leftBracket,
      statements,
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
  if (doKeyword.type !== types.keyword || doKeyword.value !== 'do') {
    return;
  }

  const subroutineCall = parseSubroutineCall(tokens.slice(tokenIndex));
  tokenIndex += subroutineCall.length;
  const semicolon = tokens[tokenIndex++];

  if (semicolon.type !== types.symbol || semicolon.value !== ';') {
    return;
  }

  return {
    type: types.doStatement,
    children: [doKeyword, subroutineCall, semicolon],
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
    returnKeyword.type !== types.keyword ||
    returnKeyword.value !== 'return'
  ) {
    return;
  }

  let expression = [];
  const token = tokens[tokenIndex];
  if (token.type !== types.symbol || token.value !== ';') {
    expression = [parseExpression(tokens.slice(tokenIndex))];
    tokenIndex += expression.length;
  }

  const semicolon = tokens[tokenIndex++];

  return {
    type: types.returnStatement,
    children: [returnKeyword, ...expression, semicolon],
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
    if (op.type !== types.symbol || !ops.includes(op.value) || !term2) {
      break;
    }
    tokenIndex += term2.length + 1;
    opTerms.push(op, term2);
  }

  return {
    type: types.expression,
    children: [term, ...opTerms],
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
    type: types.term,
    children: term.children,
    length: term.length,
  };
}

function isEmpty(tokens) {
  return !tokens || tokens.length === 0;
}

function createTokenWithChildren(children) {
  return { children: children, length: children.length };
}

function createSingleToken(token) {
  return { children: [token], length: 1 };
}

function createSingleTokenIfMatchesType(token, type) {
  return token.type === type ? createSingleToken(token) : undefined;
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
  return createSingleTokenIfMatchesType(token, types.keywordConstant);
}

function parseVarName(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const token = tokens[tokenIndex++];
  if (token.type !== types.identifier) return;

  const leftBracket = tokens[tokenIndex++];
  if (leftBracket.type !== types.symbol || leftBracket.value !== '[') {
    return createSingleToken(token);
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightBracket = tokens[tokenIndex++];
  if (rightBracket.type !== types.symbol || rightBracket.value !== ']') {
    return;
  }

  const children = [token, leftBracket, expression, rightBracket];
  return createTokenWithChildren(children);
}

function parseParenthesizedExpression(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const leftParenthesis = tokens[tokenIndex++];
  if (leftParenthesis.type !== types.symbol || leftParenthesis.value !== '(') {
    return;
  }

  const expression = parseExpression(tokens.slice(tokenIndex));
  tokenIndex += expression.length;
  const rightParenthesis = tokens[tokenIndex++];
  if (
    rightParenthesis.type !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  const children = [leftParenthesis, expression, rightParenthesis];
  return createTokenWithChildren(children);
}

function parseUnaryOpTerm(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  const unaryOp = tokens[tokenIndex++];
  if (unaryOp.type !== types.symbol || !unaryOps.includes(unaryOp.value)) {
    return;
  }

  const term = parseTerm(tokens.slice(tokenIndex));
  tokenIndex += term.length;

  const children = [unaryOp, term];
  return createTokenWithChildren(children);
}

function parseSubroutineCall(tokens) {
  if (isEmpty(tokens)) {
    return;
  }

  let tokenIndex = 0;

  let subroutineName = tokens[tokenIndex++];
  let leftParenthesis = tokens[tokenIndex++];
  if (
    subroutineName.type !== types.identifier ||
    leftParenthesis.type !== types.symbol
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
    rightParenthesis.type !== types.symbol ||
    rightParenthesis.value !== ')'
  ) {
    return;
  }

  return {
    type: types.subroutineCall,
    children: [
      ...prefixTokens,
      subroutineName,
      leftParenthesis,
      ...expressionList.children,
      rightParenthesis,
    ],
    length: tokenIndex,
  };
}

function parseExpressionList(tokens) {
  const result = {
    type: types.expressionList,
    children: [],
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
  result.children.push(expression);

  while (result.length < tokens.length - 1) {
    const first = tokens[result.length];
    const second = parseExpression(tokens.slice(result.length + 1));
    if (
      first.type !== types.symbol ||
      first.value !== ',' ||
      second.type !== types.identifier
    ) {
      break;
    }
    result.length += second.length + 1;
    result.children.push(first, second);
  }

  return result;
}
