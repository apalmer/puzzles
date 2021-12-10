data = open(__file__.replace('.py','.data'),'r').readlines()
grid = []
for y,line in enumerate(data):
    line = line.replace('\n','')
    for x,cell in enumerate(line):
        if len(grid) < x + 1:
            grid.append([])
        grid[x].append(cell)
        
print(data)

print(grid)

def get_next(grid):
    next_gen = []

    def occupied0(cord):
        x = cord[0]
        y = cord[1]
        if 0 <= x < len(grid):
            if 0 <= y < len(grid[0]):
                if grid[x][y] == '#':
                    return 1
        return 0

    def occupied(origin, direction):
        x = origin[0]
        y = origin[1]
        dx = direction[0]
        dy = direction[1]
        while (0 <= x < len(grid)) and (0 <= y < len(grid[x])):
            if grid[x][y] == '#':
                return 1
            if grid[x][y] == 'L':
                return 0
            x += dx
            y += dy
        return 0
        
    def evaluate_rules(cell,crowding):
        if cell == 'L' and crowding == 0:
            return '#'
        if cell == '#' and crowding >= 5:
            return 'L'
        return cell

    for x,col in enumerate(grid):
        for y,cell in enumerate(grid[x]):
            neighbors = [(x-1,y-1),(x,y-1),(x+1,y-1),(x-1,y),(x+1,y),(x-1,y+1),(x, y+1),(x+1, y+1)]
            directions = [(-1,-1),(0,-1),(1,-1),(-1,0),(1,0),(-1,1),(0,1),(1, 1)]
            crowding = sum([occupied((x,y),direction) for direction in directions])

            #crowding = sum(map(occupied,neighbors))
            if len(next_gen) < x + 1:
                next_gen.append([])
            next_gen[x].append(evaluate_rules(grid[x][y],crowding))
    
    return next_gen

def equivalent(a,b):
    for x in range(0,len(a)):
        for y in range(0,len(a[x])):
            if a[x][y] != b[x][y]:
                return False
    return True

curr = grid
gens = 500
prev = grid
for i in range(0,gens):
    prev,curr = curr,get_next(curr)
    if equivalent(prev,curr):
        break


sums = 0
for x in range(0,len(curr)):
    for y in range(0,len(curr[x])):
        if curr[x][y] == '#':
            sums += 1

print(curr)
print(sums)