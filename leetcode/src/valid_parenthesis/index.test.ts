export function solve(input: string) {
  const parens: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack: Array<string> = [];

  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    if (parens[char]) {
      stack.push(char);
    } 
    else {
      const last = stack.pop();
      if (!last) {
        return false;
      }
      if (parens[last] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

const testCases: Array<[string, boolean]> = [
  ["()", true],
  ["()[]{}", true],
  ["(]", false],
];

it.each(testCases)("test", (input: string, expected: boolean) => {
  let actual = solve(input);

  expect(actual).toBe(expected);
});
