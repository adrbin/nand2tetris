import { baseNames } from './baseNames.js';

export const pushSegments = {
  constant({ arg1 }) {
    return `
@${arg1} // *SP=${arg1}
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1
`;
  },
  pointer({ arg1 }) {
    const pointer = arg1 == 0 ? 'THIS' : 'THAT';
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
  temp({ arg1 }) {
    return `
@${arg1} // addr=5+${arg1}
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
  static({ arg1, fileName }) {
    return `
@${fileName}.${arg1} // *SP=${fileName}.${arg1}
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

function basePush({ command, arg1 }) {
  return `
@${arg1} // addr=${baseNames[command]}+${arg1}
D=A
@${baseNames[command]}
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1
`;
}
