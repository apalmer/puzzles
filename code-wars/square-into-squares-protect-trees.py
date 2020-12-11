"""
My little sister came back home from school with the following task: given a squared sheet of paper she has to cut it in pieces which, when assembled, give squares the sides of which form an increasing sequence of numbers. At the beginning it was lot of fun but little by little we were tired of seeing the pile of torn paper. So we decided to write a program that could help us and protects trees.

Task
Given a positive integral number n, return a strictly increasing sequence (list/array/string depending on the language) of numbers, so that the sum of the squares is equal to n².

If there are multiple solutions (and there will be), return as far as possible the result with the largest possible values:
"""
import math
import itertools

def decompose(n):
    def find_combo(options,total):
        valid = []
        for i in range (2,len(options)):
            combos = itertools.combinations(options,i)
            for combo in combos:
                if sum(combo) == total:
                    valid.append(combo)
        if len(valid) == 0:
            return None
        if len(valid) == 1:
            return valid[0]
        else:
            candidates = {max(candidate):candidate for candidate in valid}
            candidates[max(candidates)]
            
    total = n**2
    options = [i**2 for i in range(1,n)]
    return find_combo(options,total)
    
                
