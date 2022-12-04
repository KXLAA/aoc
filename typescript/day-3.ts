const a = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = [
  ...a.map((x) => String.fromCharCode(x).toLowerCase()),
  ...a.map((x) => String.fromCharCode(x)),
];
const priority = alphabet.map((a, i) => {
  return {
    [a]: i + 1,
  };
});

function ruckSack(str: string) {
  const format = str.trim().split(/\r?\n/);

  const rucksackSum = format
    .map((f) => divideString(f))
    .map((string) => getCommonLetter(string))
    .map(Object.keys)
    .flat()
    .map((v) => priority.find((element) => Object.keys(element).includes(v)))
    .map((a) => Object.values(a!))
    .flat()
    .reduce((a, c) => a + c);

  const rucksackGroupSum = chunk(format, 3)
    .map((s) => getCommonLetterFromThree(s as [string, string, string]))
    .map(Object.keys)
    .flat()
    .map((v) => priority.find((element) => Object.keys(element).includes(v)))
    .map((a) => Object.values(a!))
    .flat()
    .reduce((a, c) => a + c);

  return {
    rucksackSum,
    rucksackGroupSum,
  };
}

function divideString(str: string): [string, string] {
  return [str.substring(0, str.length / 2), str.substring(str.length / 2)];
}

function getCommonLetter(array: [string, string]) {
  let count = {} as { [key: string]: number };
  const str1 = array[0];
  const str2 = array[1];
  const str2Arr = str2.split("");
  for (let string of str1) {
    let idx = str2Arr.findIndex((s) => s === string);
    if (idx >= 0) {
      count[string] = count["string"] + 1 || 1;
      str2Arr.splice(idx, 1);
    }
  }
  return count;
}

function chunk<T>(array: T[], by: number) {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += by) {
    result.push(array.slice(i, i + by));
  }
  return result;
}

function getCommonLetterFromThree(array: [string, string, string]) {
  let count = {} as { [key: string]: number };
  const str1 = array[0];
  const str2 = array[1];
  const str3 = array[2];
  const str2Arr = str2.split("");
  const str3Arr = str3.split("");
  for (let string of str1) {
    let idx = str2Arr.findIndex((s) => s === string);
    let idx2 = str3Arr.findIndex((s) => s === string);
    if (idx >= 0 && idx2 >= 0) {
      count[string] = count["string"] + 1 || 1;
      str2Arr.splice(idx, 1);
      str3Arr.splice(idx2, 1);
    }
  }
  return count;
}
