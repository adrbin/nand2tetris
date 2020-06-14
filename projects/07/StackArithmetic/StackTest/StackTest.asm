
// push constant 17
@17 // *SP=17
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 17
@17 // *SP=17
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// eq
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@EQ.TRUE.2
D;JEQ // if arg1==arg2 then *(SP-1)=-1 else 0
@EQ.FINAL.2
D=0;JMP
(EQ.TRUE.2)
D=-1
(EQ.FINAL.2)
@SP
A=M-1
M=D

// push constant 17
@17 // *SP=17
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 16
@16 // *SP=16
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// eq
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@EQ.TRUE.5
D;JEQ // if arg1==arg2 then *(SP-1)=-1 else 0
@EQ.FINAL.5
D=0;JMP
(EQ.TRUE.5)
D=-1
(EQ.FINAL.5)
@SP
A=M-1
M=D

// push constant 16
@16 // *SP=16
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 17
@17 // *SP=17
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// eq
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@EQ.TRUE.8
D;JEQ // if arg1==arg2 then *(SP-1)=-1 else 0
@EQ.FINAL.8
D=0;JMP
(EQ.TRUE.8)
D=-1
(EQ.FINAL.8)
@SP
A=M-1
M=D

// push constant 892
@892 // *SP=892
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 891
@891 // *SP=891
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// lt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@LT.TRUE.11
D;JLT // if arg1<arg2 then *(SP-1)=-1 else 0
@LT.FINAL.11
D=0;JMP
(LT.TRUE.11)
D=-1
(LT.FINAL.11)
@SP
A=M-1
M=D

// push constant 891
@891 // *SP=891
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 892
@892 // *SP=892
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// lt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@LT.TRUE.14
D;JLT // if arg1<arg2 then *(SP-1)=-1 else 0
@LT.FINAL.14
D=0;JMP
(LT.TRUE.14)
D=-1
(LT.FINAL.14)
@SP
A=M-1
M=D

// push constant 891
@891 // *SP=891
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 891
@891 // *SP=891
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// lt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@LT.TRUE.17
D;JLT // if arg1<arg2 then *(SP-1)=-1 else 0
@LT.FINAL.17
D=0;JMP
(LT.TRUE.17)
D=-1
(LT.FINAL.17)
@SP
A=M-1
M=D

// push constant 32767
@32767 // *SP=32767
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 32766
@32766 // *SP=32766
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// gt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@GT.TRUE.20
D;JGT // if arg1>arg2 then *(SP-1)=-1 else 0
@GT.FINAL.20
D=0;JMP
(GT.TRUE.20)
D=-1
(GT.FINAL.20)
@SP
A=M-1
M=D

// push constant 32766
@32766 // *SP=32766
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 32767
@32767 // *SP=32767
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// gt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@GT.TRUE.23
D;JGT // if arg1>arg2 then *(SP-1)=-1 else 0
@GT.FINAL.23
D=0;JMP
(GT.TRUE.23)
D=-1
(GT.FINAL.23)
@SP
A=M-1
M=D

// push constant 32766
@32766 // *SP=32766
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 32766
@32766 // *SP=32766
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// gt
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
D=M-D // arg1-arg2
@GT.TRUE.26
D;JGT // if arg1>arg2 then *(SP-1)=-1 else 0
@GT.FINAL.26
D=0;JMP
(GT.TRUE.26)
D=-1
(GT.FINAL.26)
@SP
A=M-1
M=D

// push constant 57
@57 // *SP=57
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 31
@31 // *SP=31
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// push constant 53
@53 // *SP=53
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// add
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M+D // *SP=arg1+arg2

// push constant 112
@112 // *SP=112
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// sub
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M-D // *SP=arg1-arg2

// neg
@SP // *SP=-*SP
A=M-1
M=-M

// and
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M&D // *SP=arg1&arg2

// push constant 82
@82 // *SP=82
D=A
@SP
A=M
M=D
@SP // SP++
M=M+1

// or
@SP // SP--
AM=M-1
D=M // arg2=*SP
A=A-1 // arg1=*(SP-1)
M=M|D // *SP=arg1&arg2

// not
@SP // *SP=-*SP
A=M-1
M=!M
