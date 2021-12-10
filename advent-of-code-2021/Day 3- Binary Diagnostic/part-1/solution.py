import os

def process(diagnostics):
    sums = [0] * len(diagnostics[0])
    for diagnostic in diagnostics:
        for i in range(0,len(diagnostic)):
            sums[i] += int(diagnostic[i])
    
    gammaStr = '0b'
    epsilonStr = '0b'

    for sum in sums:
        if sum > (len(diagnostics) / 2): 
            gammaStr += '1'
            epsilonStr += '0'
        else:
            gammaStr += '0'
            epsilonStr += '1'
    
    gamma = int(gammaStr, 2)
    epsilon = int(epsilonStr, 2)

    return gamma * epsilon


def parse():
    data_file = os.path.dirname(__file__) + '/data.txt'
    with open(data_file) as f:
        lines = f.readlines()
        bins = [line.strip() for line in lines]
    
    return bins

if __name__ == "__main__":
   data = parse()
   output = process(data)
   print(output)