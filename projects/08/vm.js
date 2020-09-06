import { promises } from 'fs';
import * as path from 'path';

import { operations } from './operations.js';
import { pushSegments } from './pushSegments.js';
import { popSegments } from './popSegments.js';
import { branchingCommands } from './branchingCommands.js';
import { functionCommands } from './functionCommands.js';

const bootstrap = `@256
D=A
@SP
M=D
${functionCommands.call({
  arg1: 'Sys.init',
  arg2: 0,
  n: 0,
})}

`;

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
  let [command, arg1, arg2] = line.split(/\s+/);
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
`; // removes the leading end of the line
  return commentedTranslation;
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
  const codePromises = inputFiles
    .filter(inputFile => inputFile.endsWith('.vm'))
    .map(async inputFile => {
      const filePath = path.join(dirName, inputFile);
      const fileName = path.basename(filePath, path.extname(filePath));
      const lines = await readLines(filePath);
      let functionName = '';
      const assembly = lines.map(line => {
        const command = parse({
          line,
          n: lineIndex++,
          fileName,
          functionName,
        });
        if (command.type === 'function' && command.command === 'function') {
          functionName = command.arg1;
        }
        const result = writeLine(command);
        return result;
      });
      // console.log(assembly);
      const comment = `// ${inputFile}\n\n`;
      return [comment, ...assembly];
    });

  const code = (await Promise.all(codePromises)).flat();
  // console.log(code);

  let outputFile = process.argv[3];
  if (!outputFile) {
    const baseName = path.basename(input, path.extname(input));
    outputFile = path.join(dirName, baseName + '.asm');
  }
  await promises.writeFile(outputFile, [bootstrap, ...code].join(''));
}

main();
