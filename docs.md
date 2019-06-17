Implemented:

PUSH X/NUM
Push something onto the stack.
Can be either `X`, or an integer.

Example:
PUSH 5


DUPL
Duplicate the top entry on the stack.
This kills the EXA if there are no more entries on the stack.


MATHS:

ADDI
MULI
SUBI
DIVI

Takes the top 2 items in the stack and performs some math operation on them. The result is placed on the stack.
This operation consumes 2 items from the stack.
This kills the EXA if there a less than 2 entries on the stack, or at least one of the entries is not a number.

Example to substract 4 from 7 (7-4)

PUSH 4
PUSH 7
SUBI
;Top item - 2nd item.

Stack: [3]


POP / POP X
Remove the top item from the stack.
If the `X` flag is set, the value will be written to `X`, otherwise it will be deleted.
This kills the exa if there's no item on the stack to pop.



NOOP
Does nothing.

MARK [NAME]
Marks a location to jump to / spawn at.
Takes 1 cycle to traverse, but 0 cycles when jumped to.

JUMP [NAME]
Jump to a mark.
This kills the exa if the mark is not found.

REPL [NAME]
Replicate the current exa, and push it's IP to the stack of the original EXA.
The new exa will have a copy of the stack, and X, but will have a new sequential IP. Network-packets are not copied over.
This kills the exa if the mark is not found.


TJMP [NAME]
Jumps only if the top item in the stack is not 0. Does not jump if there is no item in the stack.
FJMP [NAME]
Jumps only if the top item in the stack is 0. Also jumps if there is no item in the stack.


ROT BLANK/X/NUM
Rotate the stack.
If no argument is supplied, the first value is popped from the stack, and what remains of the stack gets rotated by that value.
This kills the exa if you're trying to rotate by a string.
This also kills the exa if you don't supply an argument and the stack is empty.

RJMP BLANK/X/NUM (Relative Jump)
Jump relative to the current position.
If no argument is supplied, the first value is popped from the stack and used as the argument.
RJMP -1 repeats the last instruction indefinetely.
RJMP 0 is an infinitle loop
RJMP 1 is the same as NOOP
You can not jump past the end of the programm. RJMP -9999 will put you at the top of your code.

AJMP BLANK/X/NUM (Relative Jump)
Jump to a code line.
If no argument is supplied, the first value is popped from the stack and used as the argument.
AJMP 1 jumps to line 1
AJMP 4 jumps to line 4
You can not jump past the end of the programm. AJMP -9999 will put you at the top of your code.


FLIP
Make the top two stack items switch position.
This kills the exa if there's not at least 2 elements on the stack.

IP / IP X
Copy the current EXAs IP to the stack, or to the X register.

Behaviour:
Each cycle, EXAs are evaluated from lowest to highest ID.
Spawned EXAs become active the cycle after they have been spawned.  
EXA halts if there are no more instructions.

Use `;` for comments, both single line, and in-line.