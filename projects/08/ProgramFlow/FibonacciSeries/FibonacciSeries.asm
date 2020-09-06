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


// FibonacciSeries.vm

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

// pop pointer 1 
@SP // SP-- 
AM=M-1
D=M
@THAT // THIS=*(SP-1)
M=D

// push constant 0 
@0 // *SP=0
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop that 0 
@0 // addr=THAT+0
D=A
@THAT
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

// push constant 1 
@1 // *SP=1
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop that 1 
@1 // addr=THAT+1
D=A
@THAT
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

// push constant 2 
@2 // *SP=2
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

// branching label MAIN_LOOP_START 
($MAIN_LOOP_START)

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

// branching if-goto COMPUTE_ELEMENT 
@SP // SP--
AM=M-1
D=M
@$COMPUTE_ELEMENT // if *SP != 0 jump to label COMPUTE_ELEMENT
D;JNE

// branching goto END_PROGRAM 
@$END_PROGRAM // goto END_PROGRAM
0;JMP

// branching label COMPUTE_ELEMENT 
($COMPUTE_ELEMENT)

// push that 0 
@0 // addr=THAT+0
D=A
@THAT
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// push that 1 
@1 // addr=THAT+1
D=A
@THAT
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

// pop that 2 
@2 // addr=THAT+2
D=A
@THAT
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

// push pointer 1 
@THAT // *SP=*THAT
D=M
@SP
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

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// pop pointer 1 
@SP // SP-- 
AM=M-1
D=M
@THAT // THIS=*(SP-1)
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

// branching goto MAIN_LOOP_START 
@$MAIN_LOOP_START // goto MAIN_LOOP_START
0;JMP

// branching label END_PROGRAM 
($END_PROGRAM)

