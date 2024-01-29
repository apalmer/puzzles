import { TreeNode, parseTreeNode } from "../_dataStructures/TreeNode";

export function solve(root: TreeNode | null): boolean {
  if (!root) return true;

  const areMirrored: (left: TreeNode | null, right: TreeNode | null) => Boolean = (left: TreeNode | null, right: TreeNode | null) => {
    if (left === null && right === null) return true;
    if (left === null && right !== null) {
      return false;
    }
    if (left !== null && right === null) {
      return false;
    }

    if (left!.val !== right!.val) return false;


    return areMirrored(left!.left, right!.right) && areMirrored(left!.right, right!.left)
  }

  return false;
};

const testCases: Array<[(number | null)[], boolean]> = [
  [[1, 2, 2, 3, 4, 4, 3], true],
  [[1, 2, 2, null, 3, null, 3], false]
];

it.each(testCases)("test", (input, expected) => {
  let tree = parseTreeNode(input)
  let actual = solve(tree);
  expect(actual).toBe(expected);
})