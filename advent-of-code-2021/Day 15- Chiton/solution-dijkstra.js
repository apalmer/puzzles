import * as fs from 'fs';
import FastPriorityQueue from "fastpriorityqueue";

const QueueSlow = function(){
    let inner = {};
    let index = [];

    this.add_with_priority = function(priority, item){
        let ordered = inner[priority];
        if(ordered){
            ordered.push(item);
        }
        else{
            inner[priority] = [item];
            let ii = index.findIndex(i => i > priority);
            if(ii === -1){
                index.push(priority);
            }else{
                index.splice(ii,0,priority);
            }
        }
    }

    this.extract_min = function(){
        let minIndex = index[0];
        let minBucket = inner[minIndex]
        let min = null;
        if(minBucket){
            min = minBucket.shift();
            if(minBucket.length === 0){
                index.shift();
                delete inner[minIndex];
            }
        }

        return min;
    }

    this.decrease_priority = function(priority, item){
        for (let i = 0; i < index.length; i++) {
            const priority = index[i];
            let filtered = inner[priority].filter(x => x != item);
            if(!filtered || filtered.length == 0){
                index.splice(i,1);
                //NASTY
                i--;
                delete inner[priority];
            }
            else{
                inner[priority] = filtered;
            }
        }

        this.add_with_priority(priority, item);
    }

    this.not_empty = function(){
        return index.length > 0;
    }
};

const QueueFast = function(){
    let queue = new FastPriorityQueue((a,b) => { return a.dist < b.dist; });

    
    this.add_with_priority = function(priority, item){
      queue.add(item);
    }

    this.extract_min = function(){
        return queue.poll();
    }

    this.decrease_priority = function(priority, item){
        let state = queue.removeOne(cell => cell.coord.x == item.coord.x && cell.coord.y == item.coord.y);
        this.add_with_priority(priority, item);
    }

    this.not_empty = function(){
        return !queue.isEmpty();
    }
}

function getNeighbors(coord,state){

    let neighbors = [];

    if(coord.x > 0){
        neighbors.push(state[coord.y][coord.x-1]);
    }
    if(coord.y > 0){
        neighbors.push(state[coord.y-1][coord.x]);
    }
    if(coord.x < state[coord.y].length-1){
        neighbors.push(state[coord.y][coord.x+1]);
    }
    if(coord.y < state.length-1){
        neighbors.push(state[coord.y+1][coord.x]);
    }

    return neighbors;
}

function dijkstra(grid, startPoint){

    let q = new QueueFast();

    let state = grid.map(
        (row,y) => 
            row.map(
                (cell,x) => {

                    let cellState = {
                        cost : cell,
                        coord : {x:x,y:y},
                        dist : Infinity,
                        prev : null
                    };

                    if(startPoint.x == x && startPoint.y == y){
                        cellState.dist = 0;
                        delete cellState.prev;
                    }

                    q.add_with_priority(cellState.dist, cellState);

                    return cellState;
                })
        );

    while(q.not_empty()){
        let u = q.extract_min();
        let neighbors = getNeighbors(u.coord, state);
        neighbors.forEach(neighbor => {
            let alt = u.dist + neighbor.cost;
            if(alt < neighbor.dist){
                neighbor.dist = alt;
                neighbor.prev = u;
                q.decrease_priority(alt, neighbor);
            }
        });
    }

    return state;
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData
    .map(r => r.split('').map(Number));

const expanded = [];

let rowReps = 5;
let colReps = 5;

for (let by = 0; by < rowReps; by++) {
    for (let bx = 0; bx < colReps; bx++) {
        for (let y = 0; y < data.length; y++) {
            const rowY = (by * data.length) + y;
            if(expanded.length  - 1 < rowY){
                expanded.push([]);
            }
            let row = expanded[rowY];
            for (let x = 0; x < data[y].length; x++) {
                const colX = (bx * data[y].length) + x;
                let cost = (data[y][x] + bx + by) % 9;
                if(cost == 0){
                    cost = 9;
                }
                row[colX] = cost;
            }
            
        }       
    }   
}

let start = {x:0,y:0};
let state = dijkstra(expanded,start);

let end = {x:expanded[expanded.length-1].length-1, y:expanded.length-1};

let reverser = (curr,callback) => {
    if(!curr){
        return;
    }
    else{
        reverser(curr.prev, callback);
        callback(curr);
    }
}

let endState = state[end.y][end.x];

reverser(endState, (cell) => {
    console.log(`x:${cell.coord.x}, y:${cell.coord.y}, cost: ${cell.cost}, dist: ${cell.dist}`);
});
