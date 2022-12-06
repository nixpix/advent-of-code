const fs = require("fs");

function performMoveWithCrateMover9000(amount, stacks, sourceStack, targetStack) {
  for (let i = 0; i < amount; i++) {
    element = stacks[sourceStack].pop();
    stacks[targetStack].push(element);
  }
  return stacks;
}

function performMoveWithCrateMover9001(amount, stacks, sourceStack, targetStack) {
  let start = stacks[sourceStack].length - amount;
  let end = stacks[sourceStack].length;

  let elements = stacks[sourceStack].splice(start, end);

  elements.forEach((el) => {
    stacks[targetStack].push(el);
  });

  return stacks;
}

function findTopOfEachStack(stacks) {
  let topStacks = "";
  for (let i = 0; i < stacks.length; i++) {
    topStacks = topStacks + stacks[i].pop();
  }
  return topStacks;
}

function main() {
  let data;
  try {
    data = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let linesTemp = data.split("\n\n");
  // console.log(linesTemp);

  const stacks = linesTemp[0].split("\n");
  const moves = linesTemp[1].split("\n");

  // get the number of stacks
  lastRow = stacks[stacks.length - 1].slice(1).slice(0, -1).split("   ");
  numOfStacks = lastRow[lastRow.length - 1];
  cleanedStacks = [];
  for (let i = stacks.length - 2; i >= 0; i--) {
    /* 
      this can be done better by using regex, something like     
      cleanedStacks.push(stacks[i].match(/\[(.*?)\]/g))
      the problem is the handling of the empty spaces
    */
    stacks[i] = stacks[i] + " ";
    stackRow = stacks[i].match(/.{1,4}/g);
    for (let j = 0; j < stackRow.length; j++) {
      stackRow[j] = stackRow[j].replace("[", "");
      stackRow[j] = stackRow[j].replace("] ", "");
      stackRow[j] = stackRow[j].replace("]", "");
      if (stackRow[j] === "    ") {
        stackRow[j] = "0";
      }
    }
    cleanedStacks.push(stackRow);
  }

  let orderedStack = cleanedStacks[0].map((_, colIndex) => cleanedStacks.map((row) => row[colIndex]));

  for (let z = orderedStack.length - 1; z >= 0; z--) {
    for (let k = orderedStack[z].length - 1; k > 0; k--) {
      if (orderedStack[z][k] === "0") {
        orderedStack[z].pop();
      }
    }
  }
  console.log("Stacks:");
  console.log(orderedStack);
  console.log("\nMoves:");
  cleanedMoves = [];
  for (let i = 0; i < moves.length; i++) {
    tempRow = moves[i].split(" ");
    tempRow.shift();
    tempRow.splice(1, 1);
    tempRow.splice(2, 1);
    cleanedMoves.push(tempRow);
  }
  const crane = "9001";

  for (let i = 0; i < cleanedMoves.length; i++) {
    console.log(`Move ${cleanedMoves[i][0]} from ${cleanedMoves[i][1]} to ${cleanedMoves[i][2]}`);
    if (crane === "9000") {
      orderedStack = performMoveWithCrateMover9000(cleanedMoves[i][0], orderedStack, cleanedMoves[i][1] - 1, cleanedMoves[i][2] - 1);
    } else if (crane === "9001") {
      orderedStack = performMoveWithCrateMover9001(cleanedMoves[i][0], orderedStack, cleanedMoves[i][1] - 1, cleanedMoves[i][2] - 1);
    }
  }
  console.log("--------------------------\nFinal Stacks:");
  console.log(orderedStack);
  console.log(`Crates on top of each Stack with ${crane}: ${findTopOfEachStack(orderedStack)}`);
}

main();
