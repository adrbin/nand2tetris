export const branchingCommands = {
  label({ arg2 }) {
    return `
(LABEL.${arg2})
`;
  },
  goto({ arg2 }) {
    return `
@LABEL.${arg2} // goto ${arg2}
0;JMP
`;
  },
  ['if-goto']({ arg2 }) {
    return `
@SP // SP--
AM=M-1
D=M
@LABEL.${arg2} // if *SP != 0 jump to label ${arg2}
D;JNE
`;
  },
};
