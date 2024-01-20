function solve(nums: number[], val: number): number {
    let w = 0;
    for (let r = 0; r < nums.length; r++) {

        if (nums[r] !== val) {
            nums[w] = nums[r];
            w++;
        }
        else {

        }
    }
    return w;
}

const testCases: Array<[Array<number>, number, number]> = [
    [[3, 2, 2, 3], 3, 2],
    [[0, 1, 2, 2, 3, 0, 4, 2], 2, 5]
];

it.each(testCases)("test", (input, val, expected) => {
    let actual = solve(input, val);

    expect(actual).toBe(expected);

    for (let index = 0; index < actual; index++) {
        const element = input[index];
        expect(element).not.toBe(val);
    }
})