import os

def process(input):
    pass

def parse():
    data_file = os.path.dirname(__file__) + '/data.txt'
    with open(data_file) as f:
        lines = f.readlines()
        #ints = [int(line) for line in lines]
    
    return lines

if __name__ == "__main__":
   data = parse()
   output = process(data)
   print(output)