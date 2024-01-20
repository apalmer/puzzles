export function solve(digits: number[]): number[] {
    let i: number = digits.length - 1;
    let add: number = 1;
    while (add) {
        let sum: number = i >= 0 ? digits[i] + add : add;
        if (sum > 9) {
            sum = sum % 10;
        }
        else {
            add = 0;
        }
        if(i >= 0){
        digits[i] = sum;
        }
        else {
            digits.unshift(sum);
        }
        i--;
    }
    return digits;
};

const testCases = [
    [[1, 2, 3], [1, 2, 4]],
    [[4, 3, 2, 1], [4, 3, 2, 2]],
    [[9], [1, 0]]
];

it.each(testCases)("test", (input, expected) => {
    let actual = solve(input);

    expect(actual).toBe(expected);
})