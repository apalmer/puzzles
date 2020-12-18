import os

data = open(os.path.dirname(os.path.abspath(__file__))+'/day10-adapter-array.data')
data = list(map(int,data))

intervals = {}

def calculate_differences(adapters):
    adapters.sort()
    diff = 0
    prev = 0
    curr = 0
    for adapter in adapters:
        prev, curr = curr, adapter 
        if curr - prev > 3:
            print('Error the joltage rating difference is too large')
            break
        else:
            interval = curr - prev
            if interval in intervals:
                intervals[interval] += 1
            else:
                intervals[interval] = 1
            diff += interval
    diff += 3
    intervals[3] += 1
    return diff + 3


diff = calculate_differences(data)
print(diff)
print(intervals)
print(intervals[1]*intervals[3])

"""Part 2: 
(0), 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 3, 3
(0), 1, 4, 5, 6, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 6, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 7, 10, 12, 15, 16, 19, (22)
"""

def get_options(adapters):
    adapters.append(0)
    maximum = max(adapters)
    adapters.append(maximum+3)
    adapters.sort()
    diffs = [] 
    runs = []
    run_length = 0

    for index,curr in enumerate(adapters):
        if index == 0 or index == len(adapters) - 1:
            continue
        diff = curr - adapters[index - 1]
        diffs.append(diff)
        if diff == 1:
            run_length += 1
        else:
            runs.append(run_length)
            run_length = 0
    runs.append(run_length)


    runOptions = {0:1, 1:1, 2:2, 3:4, 4:7} 
    def get_opt(n):
        if n < 0:
            return 0
        if n in runOptions:
            return runOptions[n]
        else:
            opts = get_opt(n - 1) + get_opt(n - 2) + get_opt(n - 3)
            runOptions[n] = opts
            return opts

    opts = list(map(get_opt, runs))

    
    print(diffs)
    print(runs)
    print(opts)

    options = 1
    for opt in opts:
        options *= opt
    return options


options = get_options(data)
print(options)