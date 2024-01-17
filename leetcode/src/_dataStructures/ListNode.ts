
//Definition for singly-linked list.
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

export const parseListNode: (input: Array<number>) => ListNode | null = (input) => {
    const nodes = input.map((val) => new ListNode(val));

    for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        if(nodes.length > index + 1){
            element.next = nodes[index + 1];
        }
    }

    return nodes[0];
}

export const serializeListNode: (input: ListNode) => Array<number> | null = (input) => {
    const serialized = new Array<number>();
    serialized.push(input.val);
    let next = input.next
    while(next){
        serialized.push(next.val);
        next = next.next;
    }
    return serialized;
}