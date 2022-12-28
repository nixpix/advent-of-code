const fs = require("fs");

function main() {
  let file;
  try {
    file = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let moves = file.split("\n");

  let tailPositions = [];
  let headPositions = [];
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };

  for (let i = 0; i < moves.length; i++) {
    moves[i] = moves[i].split(" ");
  }

  let pMove = undefined;
  for (let i = 0; i < moves.length; i++) {
    console.log(moves[i][0], moves[i][1]);
    let move = moves[i][0];
    let times = moves[i][1];
    for (let j = 0; j < times; j++) {
      // head movement
      makeMove(move, head);
      headPositions.push(JSON.stringify(head));

      // tail movement
      if ((head.x === tail.x || head.x - 1 === tail.x || head.x + 1 === tail.x) && (head.y === tail.y || head.y - 1 == tail.y || head.y + 1 == tail.y)) {
      } else {
        let d = calculateDinstanceBetweenPoints(tail, head);  

        makeMove(move, tail);
        if (d > 2) {
          makeMove(pMove, tail);
        }
      }
      tailPositions.push(JSON.stringify(tail));
      console.log("tail: ", tail.x, tail.y)
      console.log("head: ", head.x, head.y)
      // printPoints(tail, head);
    }

    pMove = move;
  }

  let uniqueTailPositions = Array.from(new Set(tailPositions));
  console.log(headPositions[headPositions.length-1]);
  console.log(tailPositions[tailPositions.length-1]);
  
  console.log("Positions visited at least once: ", uniqueTailPositions.length);
  console.log(uniqueTailPositions);

  console.log("----------");
}

function makeMove(move, knot) {
  switch (move) {
    case "U":
      knot.y++;
      break;
    case "R":
      knot.x++;
      break;
    case "D":
      knot.y--;
      break;
    case "L":
      knot.x--;
      break;
  }
  return knot;
}

function calculateDinstanceBetweenPoints(pointA, pointB) {
  let d = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
  console.log("distance: ", d);
  return parseFloat(d);
}

function printPoints(pointA, pointB) {
  let a = [[]];
  let maxX = Math.max(pointA.x, pointB.x);
  let maxY = Math.max(pointA.y, pointB.y);
  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; i++) {
      if (pointA.x === i && pointA.y === j) {
        a[i][j].push("T");
      } else if (pointB.x === i && pointB.y === j) {
        a[i][j].push("H");
      } else {
        a[i][j].push(".");
      }
    }
  }
  console.log(a);
}
main();
