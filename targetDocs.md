LINK [TOP|POP|X|NUM] default pop

#TEST [expression] : X | POP | NUM | TOP
*TLT EXP EXP default pop pop
*TGT EXP EXP default pop pop
*TEQ EXP EXP default pop pop
*TNE EXP EXP default pop pop

*POP
*POP X
*TOP X
*PUSH [TOP|POP|X|NUM] default top
*DUPL
#FLIP
*SWAP
ROT [TOP|POP|X|NUM] default pop

*NOOP
*MARK [label]
*JUMP [label]
*FJMP [label]
*TJMP [label]
*CALL [label] (LINE; JUMP [LABEL])
*LINE
?AJMP [TOP|POP|X|NUM] default pop
?RJMP [TOP|POP|X|NUM] default pop
*RET (AJMP POP)

*ADDI
*MULI
*SUBI
*DIVI
*MODI

REPL [label]

?IP
?SEND [data=TOP|POP|X|NUM][ip=top|pop|x|num] no default!!
?RECV / RECV X
