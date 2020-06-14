// push constant 10
@10 // *SP=10
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

// push constant 21
@21 // *SP=21
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 22
@22 // *SP=22
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop argument 2
@2 // addr=ARG+2
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

// pop argument 1
@1 // addr=ARG+1
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

// push constant 36
@36 // *SP=36
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop this 6
@6 // addr=THIS+6
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

// push constant 42
@42 // *SP=42
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 45
@45 // *SP=45
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop that 5
@5 // addr=THAT+5
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

// push constant 510
@510 // *SP=510
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// pop temp 6
@6 // addr=5+6
D=A
@R5
D=A+D
@R13
M=D
@SP // SP--
AM=M-1
D=M // *addr=*SP
@R13
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

// push that 5
@5 // addr=THAT+5
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

// push this 6
@6 // addr=THIS+6
D=A
@THIS
A=M+D
D=M
@SP // *SP=*addr
A=M
M=D
@SP // SP++
M=M+1

// push this 6
@6 // addr=THIS+6
D=A
@THIS
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

// operation sub 
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M-D // *SP=arg1-arg2

// push temp 6
@6 // addr=5+6
D=A
@R5
A=A+D
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

