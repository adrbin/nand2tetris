import { promises } from 'fs';
import {
  keywordRegex,
  symbolRegex,
  integerConstantRegex,
  stringConstantRegex,
  identifierRegex,
  inlineCommentRegex,
  longCommentRegex,
  types,
} from './constants.js';

export async function tokenize(file) {
  const lines = (await promises.readFile(file, 'utf8')).trim(); //.replace(/\s/g, '');
  const tokens = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines.substring(i);
    const token = getToken(line);
    if (!token) {
      throw new Error(`Could not tokenize string: ${line}`);
    }
    tokens.push(token);
    i += token.match.length;
  }
  return tokens.filter(token => token && token.type !== 'comment');
}

function getToken(text) {
  return (
    getInlineComment(text) ||
    getLongComment(text) ||
    getKeyword(text) ||
    getSymbol(text) ||
    getIntegerConstant(text) ||
    getStringConstant(text) ||
    getIdentifier(text)
  );
}

function getKeyword(text) {
  return getMatch(text, keywordRegex, types.keyword);
}

function getSymbol(text) {
  return getMatch(text, symbolRegex, types.symbol);
}

function getIntegerConstant(text) {
  return getMatch(text, integerConstantRegex, types.integerConstant);
}

function getStringConstant(text) {
  return getMatch(text, stringConstantRegex, types.stringConstant);
}

function getIdentifier(text) {
  return getMatch(text, identifierRegex, types.identifier);
}

function getInlineComment(text) {
  return getMatch(text, inlineCommentRegex, types.comment);
}

function getLongComment(text) {
  return getMatch(text, longCommentRegex, types.comment);
}

function getMatch(text, regex, type) {
  const match = text.match(regex);
  return match
    ? {
        type: type,
        match: match[0],
        value: match[1],
      }
    : null;
}
