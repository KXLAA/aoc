import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf8");

function getMaxPairs(input: string) {
  const format: number[][][] = input
    .trim()
    .split(/\r?\n/)
    .map((s: string) => s.split(","))
    .map((d: string[]) => d.map((c) => c.split("-").map(Number)));

  const overlap = format.filter((b: number[][]) => {
    const first = b[0];
    const second = b[1];

    return (
      (first[0] <= second[0] && first[1] >= second[1]) ||
      (first[0] >= second[0] && first[1] <= second[1])
    );
  });

  const total = format.filter((b: number[][]) => {
    const first = b[0];
    const second = b[1];

    return first[1] >= second[0] && second[1] >= first[0];
  });

  return {
    overlap: overlap.length,
    total: total.length,
  };
}

console.log(getMaxPairs(input));
