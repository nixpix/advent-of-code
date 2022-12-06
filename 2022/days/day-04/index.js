const fs = require("fs");

/*
  Lowercase item types a through z have priorities 1 through 26.
  Uppercase item types A through Z have priorities 27 through 52.
*/

async function main() {
  let data;
  try {
    data = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let linesTemp = data.split("\n");
  let pairs = [];

  for (let line of linesTemp) {
    let tempLine = line.split(",");

    tempArr1 = tempLine[0].split("-");
    tempArr2 = tempLine[1].split("-");

    pairs.push(tempArr1.concat(tempArr2));
  }
  counter = 0;

  // Part 1 Answer
  for (let pair of pairs) {
    startA = parseInt(pair[0]);
    endA = parseInt(pair[1]);
    startB = parseInt(pair[2]);
    endB = parseInt(pair[3]);

    if (startA <= startB && endA >= endB) {
      counter++;
    } else {
      if (startA >= startB && endA <= endB) {
        counter++;
      }
    }

    // console.log(startA, endA, startB, endB);
  }
  console.log(counter);

  let counter2 = 0;
  // Part 2 Answer
  for (let pair of pairs) {
    startA = parseInt(pair[0]);
    endA = parseInt(pair[1]);
    startB = parseInt(pair[2]);
    endB = parseInt(pair[3]);

    if (endA >= startB && startA <= endB) {
      counter2++;
    }
  }
  console.log(counter2);
}

main();
