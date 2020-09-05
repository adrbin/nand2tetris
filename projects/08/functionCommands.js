export const functionCommands = {
  function({ arg1, arg2 }) {
    return `
(${arg1}) // push k = ${arg2} local variables
${push0().repeat(arg2)}
`;
  },
  call({ arg1, arg2, functionName, n }) {
    const returnLabel = `${functionName}.${arg1}.${n}`;
    return `
${pushValue(returnLabel)}
${pushValueAtAddress('LCL')}
${pushValueAtAddress('ARG')}
${pushValueAtAddress('THIS')}
${pushValueAtAddress('THAT')}
@${parseInt(arg2) + 5} // ARG = SP - n - 5 (n = ${arg2})
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@${arg1} // goto function ${arg1}
0;JMP

(${returnLabel}) // return label
`;
  },
  return() {
    return `
@LCL // FRAME = LCL
D=M
@R13
M=D

@5 // RET = *(FRAME - 5)
A=D-A
D=M
@R14
M=D

@SP // *ARG = pop()
AM=M-1
D=M
@ARG
A=M
M=D

@ARG // SP = ARG + 1
D=M+1
@SP
M=D

${assignFromFrame('THAT')}
${assignFromFrame('THIS')}
${assignFromFrame('ARG')}
${assignFromFrame('LCL')}
@R14 // goto RET
A=M
0;JMP
`;
  },
};

function push0() {
  return `
@SP // push 0
A=M
M=0
@SP
M=M+1
`;
}

function pushValue(value) {
  return `
@${value} // push ${value}
D=A
@SP
A=M
M=D
@SP
M=M+1
`;
}

function pushValueAtAddress(address) {
  return `
@${address} // push ${address}
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

function assignFromFrame(address) {
  return `
@R13 // ${address} = *(--FRAME)
AM=M-1
D=M
@${address}
M=D
`;
}
