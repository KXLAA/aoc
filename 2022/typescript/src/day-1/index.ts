import fs from "fs";

// Read the file
const file = fs.readFileSync("input.txt", "utf8");

function countCalories(calories: any) {
  // 1. Split the string into an array of strings
  const data = calories.trim();
  const grouped = data
    // 2. Split the array of strings grouped by a double line break
    .split("\n\n")
    // 3. Split each group into an array of strings by line break
    .map((group: string) => group.split("\n"))
    // 4. Map each group into an array of arrays of numbers
    .map((group: string[]) => group.map(Number));

  //add all the numbers in each group
  const sum: number[] = grouped.map((group: number[]) =>
    group.reduce((a, b) => a + b, 0)
  );

  //find the largest number in the sum array -> Part 1
  const max = Math.max(...sum);

  //largest three numbers sum -> Part 2
  const largestThree = sum
    //1. Sort the array in descending order
    .sort((a: number, b: number) => b - a)
    //2. Get the first three numbers
    .slice(0, 3)
    //3. Sum the numbers
    .reduce((a: number, b: number) => a + b, 0);

  return {
    largest: max,
    largestThree: largestThree,
  };
}

console.log(countCalories(file));
