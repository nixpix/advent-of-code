const fs = require("fs");

function hasDuplicates(array) {
  const noDuplicates = new Set(array);
  return array.length !== noDuplicates.size;
}

function main() {
  let data;
  try {
    data = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  console.log(data);

  let counter = 0;
  let stack = [];
  let position = 0;
  let duplicate = false;

  const part = 2;

  if (part === 1) {
    // Part 1 Solution
    for (let i = 0; i < data.length; i++) {
      if (stack.length > 3) {
        stack.shift();
      }
      counter++;
      let letter = data[i];
      stack.push(letter);
      console.log("\nletter: " + data[i]);
      console.log("counter: " + counter);
      console.log(stack);
      if (stack.length > 3) {
        duplicate = hasDuplicates(stack);
        if (!duplicate) {
          console.log("Marker found. Position: " + counter);
          position = counter;
          break;
        }
      }
    }
    console.log(position);
  } else if (part === 2) {
    // Part 2 Solution
    for (let i = 0; i < data.length; i++) {
      if (stack.length > 13) {
        stack.shift();
      }
      counter++;
      let letter = data[i];
      stack.push(letter);
      console.log("\nletter: " + data[i]);
      console.log("counter: " + counter);
      console.log(stack);
      if (stack.length > 13) {
        duplicate = hasDuplicates(stack);
        if (!duplicate) {
          console.log("Marker found. Position: " + counter);
          position = counter;
          break;
        }
      }
    }
    console.log(position);
  }
}

main();
