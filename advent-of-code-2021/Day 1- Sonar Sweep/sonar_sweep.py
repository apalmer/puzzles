def process(readings):
    increased = 0
    prev = None
    for curr in readings:
        if prev:
            if curr > prev:
                increased += 1
        prev = curr

    return increased

def process2(readings):
    increased = 0
    prev = None
    for index, reading in enumerate(readings):
        if(index < 2):
            continue
        curr = sum(readings[index-2:index+1])
        if prev:
            if curr > prev:
                increased += 1
        prev = curr

    return increased

def parse():
    with open('data.txt') as f:
        lines = f.readlines()
        ints = [int(line) for line in lines]

    return ints

if __name__ == "__main__":
   readings = parse()
   increased = process2(readings)
   print(increased)