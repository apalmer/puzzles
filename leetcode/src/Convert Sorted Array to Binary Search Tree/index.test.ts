import { TreeNode, serializeTreeNode } from "../_dataStructures/TreeNode";

export function solve(nums: number[]): TreeNode | null {
  return null;
};

const testCases: Array<[number[], (number | null)[]]> = [
  [[-10, -3, 0, 5, 9], [0, -3, 9, -10, null, 5]],
  [[1, 3], [3, 1]]
];

it.each(testCases)("test", (input, expected) => {
  let result = solve(input);
  let actual = serializeTreeNode(result);

  expect(actual.length).toBe(expected.length);
  actual.forEach((element, index) => {
    expect(element).toBe(expected[index]);
  });
})