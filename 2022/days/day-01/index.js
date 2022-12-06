const fs = require("fs");
const readline = require("readline");

/*
  Part 1: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
  Part 2: Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

async function main() {
  const fileStream = fs.createReadStream("input-1.txt");
  const elves = [];
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let elf = 0;
  for await (const line of rl) {
    if (line !== "") {
      elf = elf + parseInt(line);
    } else if (line === "") {
      elves.push(elf);
      elf = 0;
    }
  }

  const max = Math.max(...elves);
  const indexMax = elves.indexOf(max);

  // Part 1 Answer
  console.log(`Max callories: ${max}`);
  console.log(`Elf carrying the most calories is: ${indexMax + 1}`);

  // Part 2 Answer
  elves.sort((a, b) => a - b);

  // console.log(JSON.stringify(elves, null, 4));
  // console.log(elves[elves.length - 1], elves[elves.length - 2], elves[elves.length - 3]);
  const topThreeCalories = elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3];
  console.log(`The top three elves are carrying a total of: ${topThreeCalories} calories`);
}

main();
