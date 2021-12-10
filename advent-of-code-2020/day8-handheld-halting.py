"""
"""
data = open(__file__.replace('.py','.data'),'r').readlines()

class Operation:
    def __init__(self,operation_str):
        op_code,arguement = operation_str.split()
        arguement = int(arguement)

        self.op_code = op_code
        self.arguement = arguement
    
    def __repr__(self):
        return "Operation ({} {})".format(self.op_code,self.arguement)

class Machine:
    def __init__(self,instructions):
        self.instructions = instructions
        self.head = 0
        self.accumulator = 0
        self.previous = set()
        self.operations = { 'acc':self.acc, 'jmp':self.jmp, 'nop':self.nop}

    def acc(self,arg):
        self.accumulator += arg
        return 1

    def jmp(self,arg):
        return arg

    def nop(self,arg):
        return 1
        
    def process(self):
        next_instruction = self.head 
        while next_instruction not in self.previous:
            self.head = next_instruction
            operation = self.instructions[self.head]
            offset = self.operations[operation.op_code](operation.arguement)
            self.previous.add(self.head)
            next_instruction = self.head + offset
            if next_instruction == len(self.instructions):
                return True
        return False

program = list(map(lambda datum: Operation(datum), data))

nops = []
jmps = []

for i,op in enumerate(program):
    if op.op_code == 'nop':
        nops.append(i)
    if op.op_code == 'jmp':
        jmps.append(i)

programs = []
for nop in nops:
    altered = list(map(lambda datum: Operation(datum), data))
    altered[nop].op_code = 'jmp'
    programs.append(altered)

for jmp in jmps:
    altered = list(map(lambda datum: Operation(datum), data))
    altered[jmp].op_code = 'nop'
    programs.append(altered)

for program in programs:
    machine = Machine(program)
    complete = machine.process()
    if complete:
        print("Machine Completed: {}".format(machine.accumulator))
