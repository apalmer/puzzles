import { ListNode, parseListNode, serializeListNode } from "../_dataStructures/ListNode";

function solve(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    let first = l1;
    let second = l2;
    let carry = false;
    let sVal:number = 0;
    const sum: ListNode | null = new ListNode(-1);
    let work = sum;

    while (first || second || carry) {
        if(!(first)) {
            first = new ListNode(0);
        }
        if(!(second)) {
            second = new ListNode(0);
        }
        
        sVal = first.val + second.val + (carry ? 1 : 0);

        carry = sVal >= 10;
        if (carry) {
            sVal = sVal % 10;
        }

        let next = new ListNode(sVal);
        work.next = next;
        work = work.next;

        first = first.next;
        second = second.next;
    }

    return sum.next;
    
}


function solve2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if(!l1 || !l2){return null;}

    const convertToNumber: (list:ListNode) => number= (list) =>{
        return 0;
    }

    const convertToList: (num:number) => ListNode = (num) => {
        return new ListNode(num);
    }

    const sum = convertToNumber(l1) + convertToNumber(l2);

    return convertToList(sum);
}

const testCases = [
    [[2, 4, 3], [5, 6, 4], [7, 0, 8]]
];

it.each(testCases)("test", (input1, input2, expected) => {
    let l1 = parseListNode(input1);
    let l2 = parseListNode(input2);

    let lActual = solve(l1, l2);

    let actual = null;

    if (lActual) {
        actual = serializeListNode(lActual);
    }

    expect(actual).toBe(expected);
})