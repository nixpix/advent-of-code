const fs = require("fs");

/*
  A = Rock
  B = Paper
  C = Scissors

  X = Rock
  Y = Paper
  Z = Scissors

  A > C > B > A
  X > Z > Y > X

  Part 1: What would your total score be if everything goes exactly according to your strategy guide?
  pART 2: 
  X = loss
  Y = Draw
  Z = Win
*/

async function calculateRoundPointsPart1(round) {
  const pRock = 1;
  const pPaper = 2;
  const pScissors = 3;
  const pLoss = 0;
  const pDraw = 3;
  const pWin = 6;

  switch (JSON.stringify(round)) {
    case '["A","X"]':
      return pDraw + pRock;
    case '["A","Y"]':
      return pWin + pPaper;
    case '["A","Z"]':
      return pLoss + pScissors;
    case '["B","X"]':
      return pLoss + pRock;
    case '["B","Y"]':
      return pDraw + pPaper;
    case '["B","Z"]':
      return pWin + pScissors;
    case '["C","X"]':
      return pWin + pRock;
    case '["C","Y"]':
      return pLoss + pPaper;
    case '["C","Z"]':
      return pDraw + pScissors;
    default:
      console.log("Incorrectly formatted round");
      break;
  }
  return 0;
}

async function calculateRoundPointsPart2(round) {
  const pRock = 1;
  const pPaper = 2;
  const pScissors = 3;
  const pLoss = 0;
  const pDraw = 3;
  const pWin = 6;

  switch (JSON.stringify(round)) {
    case '["A","X"]':
      return pLoss + pScissors;
    case '["A","Y"]':
      return pDraw + pRock;
    case '["A","Z"]':
      return pWin + pPaper;
    case '["B","X"]':
      return pLoss + pRock;
    case '["B","Y"]':
      return pDraw + pPaper;
    case '["B","Z"]':
      return pWin + pScissors;
    case '["C","X"]':
      return pLoss + pPaper;
    case '["C","Y"]':
      return pDraw + pScissors;
    case '["C","Z"]':
      return pWin + pRock;
    default:
      console.log("Incorrectly formatted round");
      break;
  }
  return 0;
}

async function main() {
  let data;
  try {
    data = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let roundsTemp = data.split("\r\n");
  let rounds = [];

  for (let round of roundsTemp) {
    rounds.push(round.split(" "));
  }

  let points = 0;
  let points2 = 0;
  for (round of rounds) {
    points = points + (await calculateRoundPointsPart1(round));
    points2 = points2 + (await calculateRoundPointsPart2(round));
  }

  // Part 1 Solution
  console.log(`Total number of points: ${points}`);

  // Part 2 Solution
  console.log(`Total number of points: ${points2}`);
}

main();
