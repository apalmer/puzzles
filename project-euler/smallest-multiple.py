"""
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20
"""
import math

print(math.prod([1, 2, 3, 2, 5, 1, 7, 2, 3, 1, 11, 1, 13, 1, 1, 2, 17, 1, 19, 1]))

n = 20

#returns dictionary with key = prime factor, value = the power of that factor
def prime_factorize(n):
    facs = {}
    f = 2
    residue = n
    #12 = 1*12, 2*6, 3*4, 4*3, 6*2, 12*1
    while f * f <= n:
        while residue % f == 0:
            if f in facs:
                facs[f] += 1
            else:
                facs[f] = 1
            residue //= f
        f += 1
    if residue != 1:
        facs[residue] = 1
    return facs

prime_factorize(9)

#dictionary with key = prime factor, value = the power of that factor
factors = {}
for i in range(2,n+1):
    primes = prime_factorize(i)
    for prime in primes:
        if prime in factors:
            if factors[prime] < primes[prime]:
                factors[prime] = primes[prime]
        else:
            factors[prime] = 1

lcm = 1
for factor in factors:
    lcm *= factor**factors[factor]
print(lcm)
    
