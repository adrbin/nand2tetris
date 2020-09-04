export const operations = {
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
