// function function simplefunction.test 2
(simplefunction.test) // push k = 2 local variables

@SP // push 0
A=M
M=0
@SP
M=M+1

@SP // push 0
A=M
M=0
@SP
M=M+1


// push local 0 
@0 // addr=LCL+0
D=A
@LCL
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// push local 1 
@1 // addr=LCL+1
D=A
@LCL
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// operation not  
// not
@SP // *SP=-*SP
A=M-1
M=!M

// push argument 0 
@0 // addr=ARG+0
D=A
@ARG
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// push argument 1 
@1 // addr=ARG+1
D=A
@ARG
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// operation sub  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M-D // *SP=arg1-arg2

// function return  
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


@R13 // THAT = *(--FRAME)
AM=M-1
D=M
@THAT
M=D


@R13 // THIS = *(--FRAME)
AM=M-1
D=M
@THIS
M=D


@R13 // ARG = *(--FRAME)
AM=M-1
D=M
@ARG
M=D


@R13 // LCL = *(--FRAME)
AM=M-1
D=M
@LCL
M=D

@R14 // goto RET
A=M
0;JMP

