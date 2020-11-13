import { promises } from 'fs';
import * as path from 'path';
import { keywordRegex, symbolRegex } from './constants.js';

async function tokenize(file) {
  const lines = (await promises.readFile(file, 'utf8')).trim(); //.replace(/\s/g, '');
  const tokens = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines.substring(i);
    const token = getToken(line);
    tokens.push(token);
    i += token.match.length;
  }
  return tokens.filter(token => token);
}

function getToken(text) {
  return (
    getComment1(text) ||
    getComment2(text) ||
    getKeyword(text) ||
    getSymbol(text) ||
    getIntegerConstant(text) ||
    getStringConstant(text) ||
    getIdentifier(text)
  );
}

function getKeyword(text) {
  return getMatch(text, keywordRegex, 'keyword');
}

function getSymbol(text) {
  return getMatch(text, symbolRegex, 'symbol');
}

function getIntegerConstant(text) {
  return getMatch(text, /^\s*(\d+)/, 'integerConstant');
}

function getStringConstant(text) {
  return getMatch(text, /^\s*"([^\r\n"]*)"/, 'stringConstant');
}

function getIdentifier(text) {
  return getMatch(text, /^\s*([A-Za-z_]\w*)/, 'identifier');
}

function getComment1(text) {
  return getMatch(text, /^\s*\/\/([^\r\n]*)/, 'comment');
}

function getComment2(text) {
  return getMatch(text, /^\s*\/\*(.*)\*\//, 'comment');
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

async function main() {
  const input = process.argv[2];
  let dirName = path.dirname(input);
  let inputFiles = [path.basename(input)];
  const stat = await promises.lstat(input);
  if (stat.isDirectory()) {
    dirName = input;
    inputFiles = await promises.readdir(input);
  }
  let lineIndex = 1;
  const tokensPromises = inputFiles
    .filter(inputFile => inputFile.endsWith('.jack'))
    .map(async inputFile => {
      const filePath = path.join(dirName, inputFile);
      const fileName = path.basename(filePath, path.extname(filePath));
      const tokens = await tokenize(filePath);
      return tokens;
    });

  const tokens = (await Promise.all(tokensPromises)).flat();
  console.log(tokens);

  // let outputFile = process.argv[3];
  // if (!outputFile) {
  //   const baseName = path.basename(input, path.extname(input));
  //   outputFile = path.join(dirName, baseName + '.asm');
  // }
  // await promises.writeFile(outputFile, [bootstrap, ...code].join(''));
}

main();
