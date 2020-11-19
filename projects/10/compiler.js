import { promises } from 'fs';
import * as path from 'path';
import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';

async function main() {
  const input = process.argv[2];
  let dirName = path.dirname(input);
  let inputFiles = [path.basename(input)];
  const stat = await promises.lstat(input);
  if (stat.isDirectory()) {
    dirName = input;
    inputFiles = await promises.readdir(input);
  }
  const tokenPromises = inputFiles
    .filter(inputFile => inputFile.endsWith('.jack'))
    .map(async inputFile => {
      const filePath = path.join(dirName, inputFile);
      const tokens = await tokenize(filePath);
      return tokens;
    });

  const tokenLists = await Promise.all(tokenPromises);
  // console.log(tokenLists);

  const parsedResults = tokenLists.map(parse);
  console.log(parsedResults);

  for (let i = 0; i < parsedResults.length; i++) {
    const parsedResult = parsedResults[i];
    const baseName = path.basename(inputFiles[i], path.extname(inputFiles[i]));
    const outputFile = path.join(dirName, baseName + '.asm');
  }

  // let outputFile = process.argv[3];
  // if (!outputFile) {
  //   const baseName = path.basename(input, path.extname(input));
  //   outputFile = path.join(dirName, baseName + '.asm');
  // }
  // await promises.writeFile(outputFile, [bootstrap, ...code].join(''));
}

main();
