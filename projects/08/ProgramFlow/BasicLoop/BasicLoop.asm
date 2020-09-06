@256
D=A
@SP
M=D


@undefined.Sys.init.0 // push undefined.Sys.init.0
D=A
@SP
A=M
M=D
@SP
M=M+1


@LCL // push LCL
D=M
@SP
A=M
M=D
@SP
M=M+1


@ARG // push ARG
D=M
@SP
A=M
M=D
@SP
M=M+1


@THIS // push THIS
D=M
@SP
A=M
M=D
@SP
M=M+1


@THAT // push THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

@5 // ARG = SP - n - 5 (n = 0)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Sys.init // goto function Sys.init
0;JMP

(undefined.Sys.init.0) // return label


// BasicLoop.vm

// push constant 0 
@0 // *SP=0
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop local 0 
@0 // addr=LCL+0
D=A
@LCL
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

// branching label LOOP_START 
($LOOP_START)

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

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// pop local 0 
@0 // addr=LCL+0
D=A
@LCL
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

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

// push constant 1 
@1 // *SP=1
D=A
@SP
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

// pop argument 0 
@0 // addr=ARG+0
D=A
@ARG
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

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

// branching if-goto LOOP_START 
@SP // SP--
AM=M-1
D=M
@$LOOP_START // if *SP != 0 jump to label LOOP_START
D;JNE

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

