// function function sys.init 0
(sys.init) // push k = 0 local variables


// push constant 4000 
@4000 // *SP=4000
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop pointer 0 
@SP // SP-- 
AM=M-1
D=M
@THIS // THIS=*(SP-1)
M=D

// push constant 5000 
@5000 // *SP=5000
D=A
@SP
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

// function call sys.main 0

@sys.init.sys.main.5 // push sys.init.sys.main.5
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

@sys.main // goto function sys.main
0;JMP

(sys.init.sys.main.5) // return label

// pop temp 1 
@1 // addr=5+1
D=A
@R5
D=A+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

// branching label loop 
(sys.init$loop)

// branching goto loop 
@sys.init$loop // goto loop
0;JMP

// function function sys.main 5
(sys.main) // push k = 5 local variables

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

@SP // push 0
A=M
M=0
@SP
M=M+1


// push constant 4001 
@4001 // *SP=4001
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop pointer 0 
@SP // SP-- 
AM=M-1
D=M
@THIS // THIS=*(SP-1)
M=D

// push constant 5001 
@5001 // *SP=5001
D=A
@SP
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

// push constant 200 
@200 // *SP=200
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop local 1 
@1 // addr=LCL+1
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

// push constant 40 
@40 // *SP=40
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop local 2 
@2 // addr=LCL+2
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

// push constant 6 
@6 // *SP=6
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop local 3 
@3 // addr=LCL+3
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

// push constant 123 
@123 // *SP=123
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// function call sys.add12 1

@sys.main.sys.add12.21 // push sys.main.sys.add12.21
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

@sys.add12 // goto function sys.add12
0;JMP

(sys.main.sys.add12.21) // return label

// pop temp 0 
@0 // addr=5+0
D=A
@R5
D=A+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

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

// push local 2 
@2 // addr=LCL+2
D=A
@LCL
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// push local 3 
@3 // addr=LCL+3
D=A
@LCL
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// push local 4 
@4 // addr=LCL+4
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

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// operation add  
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

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

// function function sys.add12 0
(sys.add12) // push k = 0 local variables


// push constant 4002 
@4002 // *SP=4002
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop pointer 0 
@SP // SP-- 
AM=M-1
D=M
@THIS // THIS=*(SP-1)
M=D

// push constant 5002 
@5002 // *SP=5002
D=A
@SP
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

// push constant 12 
@12 // *SP=12
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

