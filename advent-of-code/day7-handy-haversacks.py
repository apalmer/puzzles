"""

"""
import re

data = open(__file__.replace('.py','.data'),'r').readlines()

rules = {}
inverse = {}
ordered = []

class Rule:
    def __init__(self, color,magnitude):
        self.color = color
        self.magnitude = magnitude
        self.may_contain = []

def parse_rule(ruleStr):
    p = re.compile(r'(.*) bags contain (.*)\.')
    c = re.compile(r'(\d+)\s+(.*)\s+(bag|bags)')
    match = p.search(ruleStr)
    if(match):
        color = match.groups()[0]
        rule = Rule(color,1)
        contains = match.groups()[1].split(',')
        for contain in contains:
            c_match = c.search(contain)
            if(c_match):
                c_magnitude = int(c_match.groups()[0])
                c_color = c_match.groups()[1]
                rule.may_contain.append(Rule(c_color,c_magnitude))
    return rule

def get_containers(color):
    containers = []
    if color in inverse:
        for parent_color in inverse[color]:
            parent = [parent_color]
            ancestors = get_containers(parent_color)
            if len(ancestors) == 0:
                ancestors.append(parent)
            else:
                for ancestor in ancestors:
                    ancestor.insert(0,parent_color)
            for ancestor in ancestors:
                containers.append(ancestor)
    return containers

for datum in data:
    rule = parse_rule(datum)
    rules[rule.color] = rule
    ordered.append(rule)
    for contained in rule.may_contain:
        if (contained.color) in inverse:
            inverse[contained.color].append(rule.color)
        else:
            inverse[contained.color] = [rule.color]

def measure_containers(color):
    containers = get_containers(color)
    outers = set()
    for container in containers:
        for color in container:
            outers.add(color)
    return len(outers)

print(measure_containers('shiny gold'))

def get_contained_bag_count(color):
    rule = rules[color]
    sum = 0
    for contained in rule.may_contain:
        sum += contained.magnitude 
        sum += contained.magnitude * get_contained_bag_count(contained.color)
    return sum

print(get_contained_bag_count('shiny gold'))

#tests
def all_rules_may_contains_should_be_in_inverse():
    for rule_color in rules:
        rule = rules[rule_color]
        for contained in rule.may_contain:
            if contained.color in inverse:
                if rule.color in inverse[contained.color]:
                    pass
                else:
                    print('missing container in inverse')
            else:
                print('missing inverse {}'.format(contained.color))

def reconstituted_text_should_match_input_text():
    reconstituted = [] 
    for rule in ordered:
        text = rule.color + " bags contain "
        def format_contained(rule):
            text = str(rule.magnitude) + " " + rule.color + " bag"
            if rule.magnitude > 1:
                text += "s"
            return text
        contained = [format_contained(contain) for contain in rule.may_contain]
        if(len(contained) == 0):
            text += "no other bags."
        else:
            text += ', '.join(contained) + "."
        reconstituted.append(text)

    for i in range (0,len(data)):
        if data[i].replace('\n','') != reconstituted[i]:
            print('parsing is broken')

#reconstituted_text_should_match_input_text()
#all_rules_may_contains_should_be_in_inverse()