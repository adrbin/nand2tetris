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
