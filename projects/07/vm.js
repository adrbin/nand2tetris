import { promises } from 'fs';

const operations = {
  add() {
    return `
// add
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2
`;
  },
  sub() {
    return `
// sub
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M-D // *SP=arg1-arg2
`;
  },
  neg() {
    return `
// neg
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
// or
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
// eq
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
// gt
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
// lt
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
// push constant ${arg2}
@${arg2} // *SP=${arg2}
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1
`;
  },
};

const popSegments = {};

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

function parse(line, n) {
  const [command, arg1, arg2] = line.split(/\s+/).map(x => x.toLowerCase());
  if (Object.keys(operations).includes(command)) {
    return {
      command: 'operation',
      arg1: command,
      arg2: arg1,
      n: n,
    };
  }
  return {
    command,
    arg1,
    arg2,
    n,
  };
}

function writeLine(command) {
  return translations[command.command][command.arg1](command);
}

async function main() {
  const inputFile = process.argv[2];
  const lines = await readLines(inputFile);
  const assembly = lines.map((line, i) => {
    const command = parse(line, i);
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
