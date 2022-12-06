const fs = require("fs");

/*
  Lowercase item types a through z have priorities 1 through 26.
  Uppercase item types A through Z have priorities 27 through 52.


*/
function findCommonCharacters(string1, string2) {
  let duplicateCharacter = "";
  for (let i = 0; i < string1.length; i += 1) {
    if (duplicateCharacter.indexOf(string1[i]) === -1) {
      if (string2.indexOf(string1[i]) !== -1) {
        duplicateCharacter += string1[i];
      }
    }
  }
  return duplicateCharacter;
}

async function main() {
  let data;
  try {
    data = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let linesTemp = data.split("\n");
  let rucksacks = [];

  for (let line of linesTemp) {
    temparray = [];
    temparray.push(line.slice(0, line.length / 2));
    temparray.push(line.slice(line.length / 2, line.length));
    rucksacks.push(temparray);
  }

  let sumOfPriorities = 0;
  for (const rucksack of rucksacks) {
    let commonChar = findCommonCharacters(rucksack[0], rucksack[1]);
    if (commonChar.charCodeAt(0) > 97) {
      sumOfPriorities = sumOfPriorities + commonChar.charCodeAt(0) - 96;
    } else {
      sumOfPriorities = sumOfPriorities + commonChar.charCodeAt(0) - 38;
    }
  }

  // Part 1 Answer
  console.log(sumOfPriorities);

  sumOfPriorities = 0;
  for (let i = 0; i < rucksacks.length; i = i + 3) {
    let rucksack1 = rucksacks[i][0] + rucksacks[i][1];
    let rucksack2 = rucksacks[i + 1][0] + rucksacks[i + 1][1];
    let rucksack3 = rucksacks[i + 2][0] + rucksacks[i + 2][1];
    let commonChar = findCommonCharacters(rucksack1, rucksack2);
    commonChar = findCommonCharacters(commonChar, rucksack3);

    if (commonChar.charCodeAt(0) > 97) {
      sumOfPriorities = sumOfPriorities + commonChar.charCodeAt(0) - 96;
    } else {
      sumOfPriorities = sumOfPriorities + commonChar.charCodeAt(0) - 38;
    }
  }

  // Part 2 Answer
  console.log(sumOfPriorities);
}

main();
