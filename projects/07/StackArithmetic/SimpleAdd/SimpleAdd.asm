
@7 // *SP=7
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

@8 // *SP=8
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2
