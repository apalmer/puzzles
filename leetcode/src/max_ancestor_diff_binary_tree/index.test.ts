import { TreeNode, parseTreeNode } from "../_dataStructures/TreeNode";

function solve(tree: TreeNode | null): number {
    let max = 0;

    const traverse: (tree: TreeNode | null, visitor: (node: TreeNode | null) => void) => void = (tree, visitor) => {
        if (tree) {
            visitor(tree);
            traverse(tree.left, visitor);
            traverse(tree.right, visitor);
        }
    }

    traverse(tree, (node) => {
        traverse(node, (child) => {
            if (node && child) {
                const diff = Math.abs(node.val - child.val);
                if (diff > max) {
                    max = diff;
                }
            }
        })
    });

    return max;
}

const testCases: Array<[Array<number | null>, number]> = [
    [[8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13], 7],
    [[1, null, 2, null, 0, 3], 3]
];

it.each(testCases)("execute test", (values: Array<number | null>, expected: number) => {
    let tree = parseTreeNode(values);
    if (tree) {
        let actual = solve(tree);
        expect(actual).toBe(expected);
    }
});
