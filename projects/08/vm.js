import { promises } from 'fs';
import * as path from 'path';

import { operations } from './operations.js';
import { pushSegments } from './pushSegments.js';
import { popSegments } from './popSegments.js';
import { branchingCommands } from './branchingCommands.js';
import { functionCommands } from './functionCommands.js';

const translations = {
  operation: operations,
  push: pushSegments,
  pop: popSegments,
  branching: branchingCommands,
  function: functionCommands,
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

function parse({ line, n, fileName, functionName }) {
  let [command, arg1, arg2] = line.split(/\s+/).map(x => x.toLowerCase());
  let type = '';
  if (command == 'push' || command == 'pop') {
    [type, command, arg1, arg2] = [command, arg1, arg2];
  } else if (Object.keys(operations).includes(command)) {
    type = 'operation';
  } else if (Object.keys(branchingCommands).includes(command)) {
    type = 'branching';
  } else if (Object.keys(functionCommands).includes(command)) {
    type = 'function';
  }
  return {
    type,
    command,
    arg1,
    arg2,
    n,
    fileName,
    functionName,
  };
}

function writeLine(command) {
  const translation = translations[command.type][command.command](command);
  const commentedTranslation = `// ${command.type} ${command.command || ''} ${
    command.arg1 || ''
  } ${command.arg2 || ''}
${translation.substring(1)}
`; // removes a leading end of the line
  return commentedTranslation;
}

async function main() {
  const inputFile = process.argv[2];
  const fileName = path.basename(inputFile, path.extname(inputFile));
  const lines = await readLines(inputFile);
  let functionName = '';
  const assembly = lines.map((line, i) => {
    const command = parse({ line, n: i, fileName, functionName });
    if (command.type === 'function' && command.command === 'function') {
      functionName = command.arg1;
    }
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
