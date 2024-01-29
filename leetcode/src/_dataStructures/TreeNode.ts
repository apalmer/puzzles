
//Definition for a binary tree node from LeetCode
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


export const parseTreeNode: (input: Array<number| null>) => TreeNode | null = (input) => {
    if(input === null) return null;
    if(input[0] == null) return null;

    let root = new TreeNode(input[0]);
    let toProcess = [root]
    let index = 1;

    while(toProcess.length > 0){
        const current = toProcess.shift();

        if(current === undefined) continue;
    
        if(input && input.length > index){
            let lValue = input[index];
            index++;
            if(lValue !== null){
                let left = new TreeNode(lValue);
                current.left = left;
                toProcess.push(left);
            }
        }
    
        if(input && input.length > index){
            let rValue = input[index];
            index++;
            if(rValue !== null){
                let right = new TreeNode(rValue);
                current.right = right;
                toProcess.push(right);
            }
        }

    }

    return root;
}

export const serializeTreeNode: (input: TreeNode | null) => Array<number| null> = (input) => {
    return []
}
