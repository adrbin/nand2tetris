// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

(MAINLOOP)

@fill
M=0
@KBD
D=M
@START
D=D;JEQ
@fill
M=-1

(START)
@i
M=-1

(LOOP)
@8192
D=A
@i
M=M+1 // increment i
D=D-M // 8192 - i
@FINISH
D=D;JLE // if screen ended finish

@i
D=M
@SCREEN
D=A+D
@screen_addr
M=D // calculate current screen address SCREEN + i
@fill
D=M
@screen_addr
A=M
M=D // draw 16 pixels
@LOOP
0;JMP // loop to draw next piexels

(FINISH)
@MAINLOOP
0;JMP // loop to the beginning
