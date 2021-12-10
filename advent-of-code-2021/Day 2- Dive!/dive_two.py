import os

def process(commands):
    aim = 0
    position = 0
    depth = 0
    for command in commands:
        if command[0] == 'forward':
            position += command[1]
            depth += aim * command[1]
        elif command[0] == 'slope':
            aim += command[1]
    return position * depth

def parse_command(text):
    args = text.split()
    command = args[0]
    magnitude = int(args[1])
    if command == 'forward':
        return ('forward', magnitude)
    elif command == 'down':
        return ('slope', magnitude)
    elif command == 'up':
        return ('slope', -magnitude)

def parse():
    data_file = os.path.dirname(__file__) + '/data.txt'
    with open(data_file) as f:
        lines = f.readlines()
        commands = [parse_command(line) for line in lines]
    return commands

if __name__ == "__main__":
   data = parse()
   output = process(data)
   print(output)