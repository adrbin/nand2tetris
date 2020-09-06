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


// Class1.vm

// function function Class1.set 0
(Class1.set) // push k = 0 local variables


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

// pop static 0 
@SP // SP-- 
AM=M-1
D=M
@Class1.0 // Class1.0=*SP
M=D

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

// pop static 1 
@SP // SP-- 
AM=M-1
D=M
@Class1.1 // Class1.1=*SP
M=D

// push constant 0 
@0 // *SP=0
D=A
@SP
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

// function function Class1.get 0
(Class1.get) // push k = 0 local variables


// push static 0 
@Class1.0 // *SP=Class1.0
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1

// push static 1 
@Class1.1 // *SP=Class1.1
D=M
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

// Class2.vm

// function function Class2.set 0
(Class2.set) // push k = 0 local variables


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

// pop static 0 
@SP // SP-- 
AM=M-1
D=M
@Class2.0 // Class2.0=*SP
M=D

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

// pop static 1 
@SP // SP-- 
AM=M-1
D=M
@Class2.1 // Class2.1=*SP
M=D

// push constant 0 
@0 // *SP=0
D=A
@SP
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

// function function Class2.get 0
(Class2.get) // push k = 0 local variables


// push static 0 
@Class2.0 // *SP=Class2.0
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1

// push static 1 
@Class2.1 // *SP=Class2.1
D=M
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


// push constant 6 
@6 // *SP=6
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 8 
@8 // *SP=8
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// function call Class1.set 2

@Sys.init.Class1.set.28 // push Sys.init.Class1.set.28
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

@7 // ARG = SP - n - 5 (n = 2)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Class1.set // goto function Class1.set
0;JMP

(Sys.init.Class1.set.28) // return label

// pop temp 0 
@0 // addr=R5+0
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

// push constant 23 
@23 // *SP=23
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 15 
@15 // *SP=15
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// function call Class2.set 2

@Sys.init.Class2.set.32 // push Sys.init.Class2.set.32
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

@7 // ARG = SP - n - 5 (n = 2)
D=A
@SP
D=M-D
@ARG
M=D

@SP // LCL = SP
D=M
@LCL
M=D

@Class2.set // goto function Class2.set
0;JMP

(Sys.init.Class2.set.32) // return label

// pop temp 0 
@0 // addr=R5+0
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

// function call Class1.get 0

@Sys.init.Class1.get.34 // push Sys.init.Class1.get.34
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

@Class1.get // goto function Class1.get
0;JMP

(Sys.init.Class1.get.34) // return label

// function call Class2.get 0

@Sys.init.Class2.get.35 // push Sys.init.Class2.get.35
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

@Class2.get // goto function Class2.get
0;JMP

(Sys.init.Class2.get.35) // return label

// branching label WHILE 
(Sys.init$WHILE)

// branching goto WHILE 
@Sys.init$WHILE // goto WHILE
0;JMP

