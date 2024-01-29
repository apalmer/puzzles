export function solve(a: string, b: string): string {
  let sum: Array<string> = [];
  let index = 0;
  let carry = false;

  while (index < a.length || index < b.length || carry) {
    if(index > a. length && index > b.length){ 
      sum.push('1');
      carry = false;
      continue;
    }
    let adda = index < a.length ? a[a.length - 1 - index] : '0';
    let addb = index < b.length ? b[b.length - 1 - index] : '0';
    let sumd = '';

    if(adda != addb){
      sumd = carry ? '0':'1';
    }
    else if(adda == '0'){
      sumd = carry ? '1':'0';
      carry = false;
    }
    else{
      sumd = carry ? '1': '0';
      carry = true;  
    }

    sum.push(sumd);
    index++;
  }

  return sum.reverse().join('');
}

const testCases = [
  ['11', '1', '100'],
  ['1010', '1011', '10101']
];

it.each(testCases)("test", (a, b, expected) => {
  let actual = solve(a, b);

  expect(actual).toBe(expected);
})