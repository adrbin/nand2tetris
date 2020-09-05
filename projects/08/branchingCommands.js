export const branchingCommands = {
  label({ arg1, functionName }) {
    return `
(${functionName}$${arg1})
`;
  },
  goto({ arg1, functionName }) {
    return `
@${functionName}$${arg1} // goto ${arg1}
0;JMP
`;
  },
  ['if-goto']({ arg1, functionName }) {
    return `
@SP // SP--
AM=M-1
D=M
@${functionName}$${arg1} // if *SP != 0 jump to label ${arg1}
D;JNE
`;
  },
};
