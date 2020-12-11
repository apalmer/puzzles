"""
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

ABC * DEF

                                A*F*100     +   B*F*10  +   C*F
                A*E*1000    +   B*E*100     +   C*E*10
A*D*10000   +   B*D*1000    +   C*D*100

W*100001    +   V*10010     +   U*1100
11(9091*W   +   910*V       +   100*U)

C=1,3,7,9
F=9,3,7,1

979 * 9x1
957 * 9y7
913 * 993

A * B = AB
(A - 1) * B = AB - B
A * (B - 1) = AB - A
(A - 1) * (B - 1) = AB -A -B + 1
A * (B - 2) = AB - 2A
B * (A - 2) = AB - 2B
"""

products = []

for i in range(0,A):
    for j in range(0,B):
        products.append(i*j)


def is_palindrome(number):
    return str(number) == str(number)[::-1]

palindromes = list(filter(is_palindrome, products))

print(max(palindromes))
