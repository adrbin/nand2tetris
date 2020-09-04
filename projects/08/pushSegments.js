import { baseNames } from './baseNames.js';

export const pushSegments = {
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
