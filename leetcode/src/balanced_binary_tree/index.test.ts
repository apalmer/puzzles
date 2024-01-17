import { TreeNode, parseTreeNode } from "../_dataStructures/TreeNode";
function solve(root: TreeNode | null): boolean {

    const postOrderTraverse: (tree: TreeNode | null, visitor: (node: TreeNode) => void) => void = (tree, visitor) => {
        if (!(tree)) { return; }
        postOrderTraverse(tree.left, visitor)
        postOrderTraverse(tree.right, visitor)
        visitor(tree);
    }

    postOrderTraverse(root, (node) => {
        if (!node) { return };

        if (node.left && node.right) {
            node.val = Math.max(node.left.val, node.right.val) + 1;
        }
        else if (node.left) {
            node.val = node.left.val + 1;
        }
        else if (node.right) {
            node.val = node.right.val + 1;
        }
        else {
            node.val = 1;
        }
    });

    let balanced = true;
    postOrderTraverse(root, (node) => {
        let left = 0;
        let right = 0;
        if (node.left) {
            left = node.left.val;
        }
        if (node.right) {
            right = node.right.val;
        }
        if (Math.abs(left - right) > 1) {
            balanced = false;
            return;
        }
    });

    return balanced;
}

const testCases: Array<[Array<number | null>, boolean]> = [
    [[3, 9, 20, null, null, 15, 7], true],
    [[1, 2, 2, 3, 3, null, null, 4, 4], false],
    [[1, null, 2, null, 3], false]
];

it.each(testCases)("test", (values: Array<number | null>, expected: boolean) => {
    let tree = parseTreeNode(values);
    let actual = solve(tree);

    expect(actual).toBe(expected);
})