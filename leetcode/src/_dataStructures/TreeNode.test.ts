import { parseTreeNode } from "./TreeNode";

it("parse empty", () => {
    const vals: Array<number> = [];
    const tree = parseTreeNode(vals);

    expect(tree).toBe(null)
})

it("parse single val", () => {
    const vals: Array<number> = [1];
    const tree = parseTreeNode(vals);

    expect(tree?.val).toBe(1);
    expect(tree?.left).toBe(null);
    expect(tree?.right).toBe(null);
})

it("parse 2 generations", () => {
    const vals: Array<number | null> = [1, 2, 3];
    const tree = parseTreeNode(vals);

    expect(tree?.val).toBe(1);
    expect(tree?.left?.val).toBe(2);
    expect(tree?.right?.val).toBe(3);
})

it("parse multiple generations without nulls", () => {
    const vals: Array<number | null> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const tree = parseTreeNode(vals);

    expect(tree?.val).toBe(1);
    expect(tree?.left?.val).toBe(2);
    expect(tree?.right?.val).toBe(3);
    expect(tree?.left?.left?.val).toBe(4);
    expect(tree?.left?.right?.val).toBe(5);
    expect(tree?.right?.left?.val).toBe(6);
    expect(tree?.right?.right?.val).toBe(7);
    expect(tree?.left?.left?.left?.val).toBe(8);
    expect(tree?.left?.left?.right?.val).toBe(9);
    expect(tree?.left?.right?.left?.val).toBe(10);
})

it("parse multiple  generations with null inputs", () => {
    const vals: Array<number | null> = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];
    const tree = parseTreeNode(vals);

    expect(tree?.val).toBe(8);
    expect(tree?.left?.val).toBe(3);
    expect(tree?.right?.val).toBe(10);
    expect(tree?.left?.left?.val).toBe(1);
    expect(tree?.left?.right?.val).toBe(6);
    expect(tree?.right?.left).toBe(null);
    expect(tree?.right?.right?.val).toBe(14);
    expect(tree?.left?.left?.left).toBe(null);
    expect(tree?.left?.left?.right).toBe(null);
    expect(tree?.left?.right?.left?.val).toBe(4);
    expect(tree?.left?.right?.right?.val).toBe(7);
    expect(tree?.right?.right?.left?.val).toBe(13);
})

it("parse only one branch", () => {
    const vals: Array<number | null> = [1, null, 2, null, 0, 3];
    const tree = parseTreeNode(vals);

    expect(tree?.val).toBe(1);
    expect(tree?.left).toBe(null);
    expect(tree?.right?.val).toBe(2);
    expect(tree?.right?.left).toBe(null);
    expect(tree?.right?.right?.val).toBe(0);
    expect(tree?.right?.right?.left?.val).toBe(3);
    expect(tree?.right?.right?.right).toBe(null);
})