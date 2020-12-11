"""
The sum of the squares of the first ten natural numbers is,

1^2 + 2^2 + ... + 10^2 = 385

The square of the sum of the first ten natural numbers is,

(1 + 2 + ... + 10) = 3025

(1 + 2 + ... + 10)*(1 + 2 + ... + 10)

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is .
3025 - 385 = 2640

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
"""
def diff(n):
    sum_of_squares = 0
    sum = 0
    for i in range(1,n+1):
        sum_of_squares += i**2 
        sum += i

    square_of_sums = sum**2

    difference = square_of_sums - sum_of_squares
    return difference

print(diff(10))
