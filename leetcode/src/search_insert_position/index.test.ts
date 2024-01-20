export function solve(nums: number[], target: number): number {
  let min = 0;
  let max = nums.length - 1;
  if (nums[min] > target) { return min; }
  if (nums[max] < target) { return max + 1; }

  let i = Math.floor((max + min) / 2);

  while (nums[i] !== target  && min !== max) {
    if (nums[i] < target) {
      min = i + 1;
    }
    else {
      max = i;
    }
    i = Math.floor((max + min) / 2);
  }
  return i;
};

const testCases: [number[], number, number][] = [
  [[1, 3, 5, 6], 5, 2],
  [[1, 3, 5, 6], 2, 1],
  [[1, 3, 5, 6], 7, 4]
];

it.each(testCases)("test", (input, target, expected) => {
  let actual = solve(input, target);

  expect(actual).toBe(expected);
})