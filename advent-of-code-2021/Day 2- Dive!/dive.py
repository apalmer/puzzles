import os

def process(commands):
    position = 0
    depth = 0
    for command in commands:
        if command[0] == 'position':
            position += command[1]
        elif command[0] == 'depth':
            depth += command[1]
    return position * depth

def parse_command(text):
    args = text.split()
    command = args[0]
    magnitude = int(args[1])
    if command == 'forward':
        return ('position', magnitude)
    elif command == 'down':
        return ('depth', magnitude)
    elif command == 'up':
        return ('depth', -magnitude)

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