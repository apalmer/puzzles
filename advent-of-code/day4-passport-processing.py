"""
"""
import re

data = open(__file__.replace(".py",".data"), "r").readlines()
data.append('\n')

passports =[]
passport = ''
for line in data:
    if line == '\n':
        passports.append(passport)
        passport = ''
    else:
        passport += line

def dictionarize(passport):
    passport = ' '.join(passport.replace('\n',' ').split())

    def extract(attribute):
        key, val = attribute.split(':')
        return key, val

    passport =  {element[0]:element[1] for element in map(extract, passport.split())}
    return passport

passports = list(map(dictionarize, passports))

def validate_required(passport):
    required = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid'
    ]
    return all([field in passport for field in required])

def validate_byr(passport):
    byr = passport['byr']
    if byr.isdigit() and len(byr) == 4:
        byr = int(byr)
        return 1920 <= byr <= 2002  
    return False

def validate_iyr(passport):
    iyr = passport['iyr']
    if iyr.isdigit() and len(iyr) == 4:
        iyr = int(iyr)
        return 2010 <= iyr <= 2020
    return False

def validate_eyr(passport):
    eyr = passport['eyr']
    if eyr.isdigit() and len(eyr) == 4:
        eyr = int(eyr)
        return 2020 <= eyr <= 2030   
    return False

def validate_hgt(passport):
    match = re.search(r'^(\d+)(cm|in)$',passport['hgt']) 
    if match:
        units = match.groups()[1]
        magnitude = int(match.groups()[0])
        if units == 'cm':
            return 150 <= magnitude <= 193
        if units == 'in':
            return 59 <= magnitude <= 76
    return False

def validate_hcl(passport):
    match = re.search(r'^#([0-9a-f]{6})$',passport['hcl'])
    if match:
        return True
    return False
    
def validate_ecl(passport):
    match = re.search(r'^(amb|blu|brn|gry|grn|hzl|oth)$',passport['ecl'])
    if match:
        return True
    return False
 
def validate_pid(passport):
    match = re.search(r'^(\d{9})$',passport['pid'])
    if match:
        return True
    return False

def validate(passport):
    validations = [validate_required,validate_byr,validate_iyr,validate_eyr,validate_hgt,validate_hcl,validate_ecl,validate_pid]

    def curry(param):
        def application(func):
            return func(param)
        return application

    return all(map(curry(passport),validations))

valid = list(filter(validate, passports))

print(len(valid))

