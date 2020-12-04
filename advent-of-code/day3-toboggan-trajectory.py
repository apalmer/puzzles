"""

"""

data = open(__file__.replace(".py",".data"), "r").readlines()

tree_count = 0
output = []

for y, line in enumerate(data):
    x = (3 * y) % (len(line)-1)
    
    marker = "O"

    if line[x] == "#":
        tree_count += 1
        marker = "X"
    
    slope = line[:x] + marker + line[x+1:]
    output.append(slope)

with open('output.map','w') as f:
    for item in output:
        f.write(item)

print(tree_count)


line_length = len(data[0])-1
vertical = ''.join(data).replace('\n','')

index = 0
y = 1 
x = 3
while index < len(vertical):
    char = vertical[index]
    print(char)
    prev_line = index % line_length
    curr_line = (index + x) % line_length 
    if curr_line != prev_line:
        multi 
    index += y*line_length + x

#print(vertical)

