export const keywords = [
  'class',
  'constructor',
  'function',
  'method',
  'field',
  'static',
  'var',
  'int',
  'char',
  'boolean',
  'void',
  'true',
  'false',
  'null',
  'this',
  'let',
  'do',
  'if',
  'else',
  'while',
  'return',
];

export const symbols = [
  '{',
  '}',
  '(',
  ')',
  '\\[',
  '\\]',
  '.',
  ',',
  ';',
  '+',
  '_',
  '*',
  '\\/',
  '&',
  '|',
  '<',
  '>',
  '=',
  '-',
];

export const dataTypes = ['int', 'char', 'boolean', 'void'];
export const staticOrFieldTypes = ['static', 'field'];
export const subroutineTypes = ['constructor', 'function', 'method'];
export const ops = ['+', '_', '*', '/', '&', '|', '<', '>', '=', '-'];
export const unaryOps = ['+', '-'];
export const keywordConsts = ['true', 'false', 'null', 'this'];

export const types = {
  keyword: 'keyword',
  symbol: 'symbol',
  integerConstant: 'integerConstant',
  stringConstant: 'stringConstant',
  identifier: 'identifier',
  comment: 'comment',
  class: 'class',
  classVarDec: 'classVarDec',
  varDec: 'varDec',
  parameterList: 'parameterList',
  subroutineDec: 'subroutineDec',
  subroutineBody: 'subroutineBody',
  statements: 'statements',
  letStatement: 'letStatement',
  ifStatement: 'ifStatement',
  whileStatement: 'whileStatement',
  doStatement: 'doStatement',
  returnStatement: 'returnStatement',
  expression: 'expression',
  term: 'term',
  subroutineCall: 'subroutineCall',
  expressionList: 'expressionList',
};

export const keywordRegex = new RegExp(`^\\s*(${keywords.join('|')})`);
export const symbolRegex = new RegExp(`^\\s*([${symbols.join('')}])`);
export const integerConstantRegex = /^\s*(\d+)/;
export const stringConstantRegex = /^\s*"([^\r\n"]*)"/;
export const identifierRegex = /^\s*([A-Za-z_]\w*)/;
export const inlineCommentRegex = /^\s*\/\/([^\r\n]*)/;
export const longCommentRegex = /^\s*\/\*(.*)\*\//;
