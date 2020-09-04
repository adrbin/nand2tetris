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

// branching label main_loop_start
(LABEL.main_loop_start)

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

// branching if-goto compute_element
@SP // SP--
AM=M-1
D=M
@LABEL.compute_element // if *SP != 0 jump to label compute_element
D;JNE

// branching goto end_program
@LABEL.end_program // goto end_program
0;JMP

// branching label compute_element
(LABEL.compute_element)

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

// branching goto main_loop_start
@LABEL.main_loop_start // goto main_loop_start
0;JMP

// branching label end_program
(LABEL.end_program)

