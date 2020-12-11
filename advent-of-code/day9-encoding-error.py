"""

"""
data = open(__file__.replace('.py','.data'),'r').readlines()
index = 0
preamble = 25
limit = 25
window = []
invalid = -1

def target_found(options,target):
    sorte = sorted(options)
    first = 0
    last = limit - 1
    while first < last:
        sum = sorte[first]+sorte[last] 
        if sum == target:
            return True
        elif sum < target:
            first += 1
        elif sum > target:
            last -= 1
    return False

for i in range(0,preamble):
    window.append(int(data[i].replace('\n','')))
    index +=1

index = preamble

while True:
    current = int(data[index].replace('\n',''))
    if target_found(window,current):
        oldest = window.pop(0)
        window.append(current)
        index += 1
    else:
        invalid = current
        print(index, current)
        break

