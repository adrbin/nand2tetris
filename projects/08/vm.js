import { promises } from 'fs';
import * as path from 'path';

import { operations } from './operations.js';
import { pushSegments } from './pushSegments.js';
import { popSegments } from './popSegments.js';
import { branchingCommands } from './branchingCommands.js';

const translations = {
  operation: operations,
  push: pushSegments,
  pop: popSegments,
  branching: branchingCommands,
};

async function readLines(file) {
  return (await promises.readFile(file, 'utf8'))
    .split('\n')
    .map(line => {
      const commentStart = line.indexOf('//');
      if (commentStart === -1) {
        return line;
      }
      return line.substring(0, commentStart);
    })
    .map(line => line.trim())
    .filter(line => line);
}

function parse(line, n, fileName) {
  let [command, arg1, arg2] = line.split(/\s+/).map(x => x.toLowerCase());
  if (Object.keys(operations).includes(command)) {
    [command, arg1, arg2] = ['operation', command, arg1];
  } else if (Object.keys(branchingCommands).includes(command)) {
    [command, arg1, arg2] = ['branching', command, arg1];
  }
  return {
    command,
    arg1,
    arg2,
    n,
    fileName,
  };
}

function writeLine(command) {
  const translation = translations[command.command][command.arg1](command);
  const commentedTranslation = `// ${command.command} ${command.arg1 || ''} ${
    command.arg2 || ''
  }
${translation.substring(1)}
`; // removes a leading end of the line
  return commentedTranslation;
}

async function main() {
  const inputFile = process.argv[2];
  const fileName = path.basename(inputFile, path.extname(inputFile));
  const lines = await readLines(inputFile);
  const assembly = lines.map((line, i) => {
    const command = parse(line, i, fileName);
    const result = writeLine(command);
    return result;
  });
  let outputFile = process.argv[3];
  if (!outputFile) {
    const extensionStart = inputFile.lastIndexOf('.');
    if (extensionStart === -1) {
      extensionStart = inputFile.length;
    }
    outputFile = inputFile.substring(0, extensionStart) + '.asm';
  }
  await promises.writeFile(outputFile, assembly.join(''));
}

main();
