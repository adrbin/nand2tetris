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


// Main.vm

// function function Main.fibonacci 0
(Main.fibonacci) // push k = 0 local variables


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

// operation lt  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@LT.TRUE.4
D;JLT // if arg1<arg2 then *(SP-1)=-1 else 0
@LT.FINAL.4
D=0;JMP
(LT.TRUE.4)
D=-1
(LT.FINAL.4)
@SP
A=M-1
M=D

// branching if-goto IF_TRUE 
@SP // SP--
AM=M-1
D=M
@Main.fibonacci$IF_TRUE // if *SP != 0 jump to label IF_TRUE
D;JNE

// branching goto IF_FALSE 
@Main.fibonacci$IF_FALSE // goto IF_FALSE
0;JMP

// branching label IF_TRUE 
(Main.fibonacci$IF_TRUE)

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

// branching label IF_FALSE 
(Main.fibonacci$IF_FALSE)

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

// function call Main.fibonacci 1

@Main.fibonacci.Main.fibonacci.14 // push Main.fibonacci.Main.fibonacci.14
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

@6 // ARG = SP - n - 5 (n = 1)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Main.fibonacci // goto function Main.fibonacci
0;JMP

(Main.fibonacci.Main.fibonacci.14) // return label

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

// function call Main.fibonacci 1

@Main.fibonacci.Main.fibonacci.18 // push Main.fibonacci.Main.fibonacci.18
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

@6 // ARG = SP - n - 5 (n = 1)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Main.fibonacci // goto function Main.fibonacci
0;JMP

(Main.fibonacci.Main.fibonacci.18) // return label

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

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

// Sys.vm

// function function Sys.init 0
(Sys.init) // push k = 0 local variables


// push constant 4 
@4 // *SP=4
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// function call Main.fibonacci 1

@Sys.init.Main.fibonacci.23 // push Sys.init.Main.fibonacci.23
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

@6 // ARG = SP - n - 5 (n = 1)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Main.fibonacci // goto function Main.fibonacci
0;JMP

(Sys.init.Main.fibonacci.23) // return label

// branching label WHILE 
(Sys.init$WHILE)

// branching goto WHILE 
@Sys.init$WHILE // goto WHILE
0;JMP

