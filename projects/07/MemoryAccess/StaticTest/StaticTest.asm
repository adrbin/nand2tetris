// push constant 111
@111 // *SP=111
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 333
@333 // *SP=333
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 888
@888 // *SP=888
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop static 8
@SP // SP-- 
AM=M-1
D=M
@StaticTest.8 // StaticTest.8=*SP
M=D

// pop static 3
@SP // SP-- 
AM=M-1
D=M
@StaticTest.3 // StaticTest.3=*SP
M=D

// pop static 1
@SP // SP-- 
AM=M-1
D=M
@StaticTest.1 // StaticTest.1=*SP
M=D

// push static 3
@StaticTest.3 // *SP=StaticTest.3
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1

// push static 1
@StaticTest.1 // *SP=StaticTest.1
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

// push static 8
@StaticTest.8 // *SP=StaticTest.8
D=M
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

