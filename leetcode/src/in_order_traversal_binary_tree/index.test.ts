import { TreeNode } from "../_dataStructures/TreeNode"

function solve(input: number) {
    return input;
}

const testCases = [
    [1, 1]
];

it.each(testCases)("test", (input, expected) => {
    let actual = solve(input);

    expect(actual).toBe(expected);
})