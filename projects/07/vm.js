import { promises } from 'fs';
import * as path from 'path';

const operations = {
  add() {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2
`;
  },
  sub() {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M-D // *SP=arg1-arg2
`;
  },
  neg() {
    return `
@SP // *SP=-*SP
A=M-1
M=-M
`;
  },
  and() {
    return `
// and
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M&D // *SP=arg1&arg2
`;
  },
  or() {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M|D // *SP=arg1&arg2
`;
  },
  not() {
    return `
// not
@SP // *SP=-*SP
A=M-1
M=!M
`;
  },
  eq({ n }) {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@EQ.TRUE.${n}
D;JEQ // if arg1==arg2 then *(SP-1)=-1 else 0
@EQ.FINAL.${n}
D=0;JMP
(EQ.TRUE.${n})
D=-1
(EQ.FINAL.${n})
@SP
A=M-1
M=D
`;
  },
  gt({ n }) {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@GT.TRUE.${n}
D;JGT // if arg1>arg2 then *(SP-1)=-1 else 0
@GT.FINAL.${n}
D=0;JMP
(GT.TRUE.${n})
D=-1
(GT.FINAL.${n})
@SP
A=M-1
M=D
`;
  },
  lt({ n }) {
    return `
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@LT.TRUE.${n}
D;JLT // if arg1<arg2 then *(SP-1)=-1 else 0
@LT.FINAL.${n}
D=0;JMP
(LT.TRUE.${n})
D=-1
(LT.FINAL.${n})
@SP
A=M-1
M=D
`;
  },
};

const pushSegments = {
  constant({ arg2 }) {
    return `
@${arg2} // *SP=${arg2}
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1
`;
  },
  pointer({ arg2 }) {
    const pointer = arg2 == 0 ? 'THIS' : 'THAT';
    return `
@${pointer} // *SP=*${pointer}
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1
`;
  },
  temp({ arg2 }) {
    return `
@${arg2} // addr=5+${arg2}
D=A
@R5
A=A+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1
`;
  },
  static({ arg2, fileName }) {
    return `
@${fileName}.${arg2} // *SP=${fileName}.${arg2}
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1
`;
  },
  local(args) {
    return basePush(args);
  },
  argument(args) {
    return basePush(args);
  },
  this(args) {
    return basePush(args);
  },
  that(args) {
    return basePush(args);
  },
};

const popSegments = {
  local(args) {
    return basePop(args);
  },
  argument(args) {
    return basePop(args);
  },
  this(args) {
    return basePop(args);
  },
  that(args) {
    return basePop(args);
  },
  pointer({ arg2 }) {
    const pointer = arg2 == 0 ? 'THIS' : 'THAT';
    return `
@SP // SP-- 
AM=M-1
D=M
@${pointer} // THIS=*(SP-1)
M=D
`;
  },
  temp({ arg2 }) {
    return `
@${arg2} // addr=5+${arg2}
D=A
@R5
D=A+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
M=D
`;
  },
  static({ arg2, fileName }) {
    return `
@SP // SP-- 
AM=M-1
D=M
@${fileName}.${arg2} // ${fileName}.${arg2}=*SP
M=D
`;
  },
};

const baseNames = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  temp: 'R5',
};

function basePush({ arg1, arg2 }) {
  return `
@${arg2} // addr=${baseNames[arg1]}+${arg2}
D=A
@${baseNames[arg1]}
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1
`;
}

function basePop({ arg1, arg2 }) {
  return `
@${arg2} // addr=${baseNames[arg1]}+${arg2}
D=A
@${baseNames[arg1]}
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D
`;
}

const translations = {
  operation: operations,
  push: pushSegments,
  pop: popSegments,
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
    return {
      command: 'operation',
      arg1: command,
      arg2: arg1,
      n,
      fileName,
    };
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
`; // removes leading end of the line
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
