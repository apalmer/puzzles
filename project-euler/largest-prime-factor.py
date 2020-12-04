"""
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
"""
n = 600851475143
residue = n
factors = []
for i in range(2,n):
    if i * i > n:
        break
    while residue % i == 0:
        residue //= i
        factors.append(i)
if residue > 1:
    factors.append(residue)
print(max(factors))
