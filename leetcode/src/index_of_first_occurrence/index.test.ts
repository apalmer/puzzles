export function solve(haystack: string, needle: string): number {
    let match = false;
    let h = 0;
    for (; h < haystack.length - needle.length + 1; h++) {
        for (let n = 0; n < needle.length; n++) {
            if (haystack[h + n] === needle[n]) {
                if (n === needle.length - 1) {
                    match = true;
                    break;
                }
            }
            else{
                break;
            }
        }
        if (match) {
            break;
        }
    }

    return match ? h : -1;
}

export function solve2(haystack: string, needle: string): number {
    return haystack.indexOf(needle);
}

const testCases: Array<[string, string, number]> = [
    ["sadbutsad", "sad", 0],
    ["leetcode", "leeto", -1],
    ["hello", "ll", 2],
];

it.each(testCases)("test", (haystack: string, needle: string, expected: number) => {
    let actual = solve(haystack, needle);

    expect(actual).toBe(expected);
})