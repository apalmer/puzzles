"""
--- Day 2: Password Philosophy ---
Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?
"""
import re

data = open(__file__.replace(".py",".data"), "r").readlines()

rx = re.compile(r'(\d+)-(\d+)\s(.):\s*(.*)')

valid = 0
invalid = 0
really_valid = 0
really_invalid = 0

for passwordEntry in data:
    match = rx.search(passwordEntry)
    if match:
        minimum = int(match.groups()[0])
        maximum = int(match.groups()[1])
        character = match.groups()[2]
        password = match.groups()[3]

        appearances = password.count(character)
        if minimum <= appearances <= maximum:
            valid += 1
            print("VALID: {} - {} > {} : {}".format(minimum, maximum, character, password))
        else:
            invalid += 1
            print("INVALID: {} - {} > {} : {}".format(minimum, maximum, character, password))

        if bool(password[minimum-1] == character) ^ bool(password[maximum-1] == character):
            really_valid += 1
            print("REALLY_VALID: {} - {} > {} : {}".format(minimum, maximum, character, password))
        else:
            really_invalid += 1
            print("REALLY_INVALID: {} - {} > {} : {}".format(minimum, maximum, character, password))

print("valid: {}".format(valid))
print("invalid: {}".format(invalid))
print("really_valid: {}".format(really_valid))
print("really_invalid: {}".format(really_invalid))
print("total: {}".format(len(data)))