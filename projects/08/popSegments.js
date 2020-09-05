import { baseNames } from './baseNames.js';

export const popSegments = {
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
  pointer({ arg1 }) {
    const pointer = arg1 == 0 ? 'THIS' : 'THAT';
    return `
@SP // SP-- 
AM=M-1
D=M
@${pointer} // THIS=*(SP-1)
M=D
`;
  },
  temp({ arg1 }) {
    return `
@${arg1} // addr=R5+${arg1}
D=A
@R5
D=A+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D
`;
  },
  static({ arg1, fileName }) {
    return `
@SP // SP-- 
AM=M-1
D=M
@${fileName}.${arg1} // ${fileName}.${arg1}=*SP
M=D
`;
  },
};

function basePop({ command, arg1 }) {
  return `
@${arg1} // addr=${baseNames[command]}+${arg1}
D=A
@${baseNames[command]}
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
