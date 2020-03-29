// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

@R0
D=M
@i
M=D // initialize i = R0

@sum
M=0 // initialize sum = 0

(LOOP)
@i
MD=M-1
@FINISH
D=D;JLT // if i < 0 end loop
@R1
D=M
@sum
M=M+D // add sum + R1
@LOOP
0;JMP

(FINISH)
@sum
D=M
@R2
M=D // R2 = sum

(END)
@END
0;JMP