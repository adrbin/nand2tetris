import { promises } from 'fs';
import * as path from 'path';
import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';
import { generateCode } from './code-generator.js';

async function main() {
  const input = process.argv[2];
  let dirName = path.dirname(input);
  let inputFiles = [path.basename(input)];
  const stat = await promises.lstat(input);
  if (stat.isDirectory()) {
    dirName = input;
    inputFiles = await promises.readdir(input);
  }

  inputFiles = inputFiles.filter(inputFile => inputFile.endsWith('.jack'));

  const tokenPromises = inputFiles.map(async inputFile => {
    const filePath = path.join(dirName, inputFile);
    const tokens = await tokenize(filePath);
    return tokens;
  });

  const tokenLists = await Promise.all(tokenPromises);
  // console.log(tokenLists);

  const parsedResults = tokenLists.map(parse);
  const code = parsedResults.map(generateCode);

  for (let i = 0; i < code.length; i++) {
    const baseName = path.basename(inputFiles[i], path.extname(inputFiles[i]));
    const outputFile = path.join(dirName, `${baseName}.vm`);
    await promises.writeFile(outputFile, code[i]);
  }
}

main();
