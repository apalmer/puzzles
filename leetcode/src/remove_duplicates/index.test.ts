export function solve(nums: number[]): number {
    let len = nums.length;
    let index = 1;
    while(index < len){
        if(nums[index - 1] === nums[index]){
            nums.splice(index,1);
            len--;
        }
        else{
            index++;
        }
    }
    return len;
}

const testCases : Array<[Array<number>,number,Array<number>]>= [
    [[1,1,2], 2, [1,2]]
];

it.each(testCases)("test", (input, expectedCount, expected) => {
    let actualCount = solve(input);
    
    expect(actualCount).toBe(expectedCount);
    expect(input.slice(0,actualCount)).toEqual(expected);
})