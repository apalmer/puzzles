import { ListNode,parseListNode, serializeListNode } from "../_dataStructures/ListNode";

function solve(list1: ListNode | null,list2: ListNode | null): ListNode | null {
  const head = new ListNode(-1);
  let pointer = head;
  while(list1 || list2){
    if(!list1){
      pointer.next = list2;
      break;
    }
    if(!list2){
      pointer.next = list1;
      break;
    }
    if(list1.val < list2.val){
      pointer.next = new ListNode(list1.val);
      pointer = pointer.next;
      list1 = list1.next;
    }
    else{
      pointer.next = new ListNode(list2.val);
      pointer = pointer.next;
      list2 = list2.next;
    }
  }
  return pointer.next;
}

const testCases = [
  [
    [1, 2, 4],
    [1, 3, 4],
    [1, 1, 2, 3, 4, 4],
  ],
];

it.each(testCases)("test", (arr1, arr2, expected) => {
    let list1 =  parseListNode(arr1);
    let list2 = parseListNode(arr2);
    let result = solve(list1, list2);
    let actual = serializeListNode(result!);
    expect(actual).toBe(expected);
})