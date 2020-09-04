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

// branching label loop_start
(LABEL.loop_start)

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

// branching if-goto loop_start
@SP // SP--
AM=M-1
D=M
@LABEL.loop_start // if *SP != 0 jump to label loop_start
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

