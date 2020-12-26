data = open(__file__.replace('.py','.data'),'r').readlines()

import math

def north(x,y,d,m):
    return (x,y+m,d)
def south(x,y,d,m):
    return (x,y-m,d)
def east(x,y,d,m):
    return (x+m,y,d)
def west(x,y,d,m):
    return (x-m,y,d)
def left(x,y,d,m):
    return (x,y,d+m)
def right(x,y,d,m):
    return (x,y,d-m)
def forward(x,y,d,m):
    return (x+math.cos(math.radians(d))*m, y+math.sin(math.radians(d))*m, d)
def forwardw(x,y,d,m):
   pass 

ops = { 'N':north, 'S':south, 'E':east, 'W':west, 'L':left, 'R':right, 'F':forward }
position =  (0,0,0)
waypoint = (10,1)

def manhattan(x,y,d):
    return abs(x) + abs(y)

for datum in data:
    datum = datum.replace(r'\n','')
    op = datum[0]
    arg = int(datum[1:])
    position = ops[op](position[0],position[1],position[2],arg)

dist = manhattan(position[0],position[1],position[2])
print(dist)