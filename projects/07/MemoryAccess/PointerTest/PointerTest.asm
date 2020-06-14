// push constant 3030
@3030 // *SP=3030
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

// push constant 3040
@3040 // *SP=3040
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

// push constant 32
@32 // *SP=32
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop this 2
@2 // addr=THIS+2
D=A
@THIS
D=M+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
A=M
M=D

// push constant 46
@46 // *SP=46
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop that 6
@6 // addr=THAT+6
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

// push pointer 0
@THIS // *SP=*THIS
D=M
@SP
A=M
M=D
@SP // SP++
M=M+1

// push pointer 1
@THAT // *SP=*THAT
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

// push this 2
@2 // addr=THIS+2
D=A
@THIS
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

// push that 6
@6 // addr=THAT+6
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

