const fs = require("fs");

function main() {
  let file;
  try {
    file = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let gridLines = file.split("\n");

  let visible = 0;
  let coordinates = [];

  for (let i = 0; i < gridLines.length; i++) {
    gridLines[i] = gridLines[i].split("");
  }

  for (let i = 0; i < gridLines.length; i++) {
    for (let j = 0; j < gridLines[i].length; j++) {
      gridLines[i][j] = parseInt(gridLines[i][j]);
    }
  }
  let maxGrid = JSON.parse(JSON.stringify(gridLines));
  for (let i = 0; i < gridLines.length; i++) {
    for (let j = 0; j < gridLines[i].length; j++) {
      // console.log(maxGrid[i][j]);
      maxGrid[i][j] = 0;
    }
  }

  let maxRow = gridLines.length;
  let maxCol = gridLines[0].length;

  console.log(gridLines);
  console.log("----------");

  // console.log("row forwards ----------");
  for (let i = 0; i < gridLines.length - 1; i++) {
    let max = 0;
    let x, y;
    for (let j = 0; j < gridLines[i].length - 1; j++) {
      if (gridLines[i][j] > max) {
        max = gridLines[i][j];
        x = i;
        y = j;
        maxGrid[x][y] = max;
        if (
          coordinates.find((point) => {
            point.x !== x && point.y !== y;
          })
        ) {
          coordinates.push({ x: x, y: y });
        }
      }
    }
  }
  // console.log(maxGrid);

  // console.log("columns forwards ----------");
  for (let i = 0; i < gridLines.length - 1; i++) {
    let max = 0;
    let x, y;
    for (let j = 0; j < gridLines[i].length - 1; j++) {
      if (gridLines[j][i] > max) {
        max = gridLines[j][i];
        x = j;
        y = i;
        maxGrid[x][y] = max;
        if (
          !coordinates.find((point) => {
            point.x === x && point.y === y;
          })
        ) {
          coordinates.push({ x: x, y: y });
        }
      }
    }
  }
  // console.log(maxGrid);

  // console.log("row backwards ----------");
  for (let i = gridLines.length - 1; i > 0; i--) {
    let max = 0;
    let x, y;
    for (let j = gridLines[i].length - 1; j > 0; j--) {
      if (gridLines[i][j] > max) {
        max = gridLines[i][j];
        x = i;
        y = j;
        maxGrid[x][y] = max;
        if (
          !coordinates.find((point) => {
            point.x === x && point.y === y;
          })
        ) {
          coordinates.push({ x: x, y: y });
        }
      }
    }
  }
  // console.log(maxGrid);

  // console.log("column backwards ----------");
  for (let i = gridLines.length - 1; i > 0; i--) {
    let max = 0;
    let x, y;
    for (let j = gridLines[i].length - 1; j > 0; j--) {
      if (gridLines[j][i] > max) {
        max = gridLines[j][i];
        x = j;
        y = i;
        maxGrid[x][y] = max;
        if (
          !coordinates.find((point) => {
            point.x === x && point.y === y;
          })
        ) {
          coordinates.push({ x: x, y: y });
        }
      }
    }
  }
  // console.log(maxGrid);

  // columns
  for (let i = 1; i < maxGrid.length - 1; i++) {
    for (let j = 1; j < maxGrid[i].length - 1; j++) {
      if (maxGrid[i][j] !== 0) {
        visible++;
      }
    }
  }
  visible = visible + maxGrid.length * 2 + maxGrid[0].length * 2 - 4;

  // Part 1
  console.log("Solution 1:");
  console.log(maxGrid);
  console.log("Visible:");
  console.log(visible);
  console.log("Coordinates:");
  console.log(coordinates);

  // Part 2
  console.log("Solution 1:");
  let maxScenicScore = 0;
  coordinates.forEach((tree) => {
    x = tree.x;
    y = tree.y;
    let max = gridLines[x][y];
    let scoreRight = 0;
    let scoreLeft = 0;
    let scoreDown = 0;
    let scoreUp = 0;
    let tempScenicScore = 0;
    console.log(`For tree of size ${gridLines[x][y]} at coordinates x: ${x}, y: ${y}`);
    // going right
    for (let i = x, j = y + 1; j < gridLines[i].length; j++) {
      scoreRight += 1;
      if (gridLines[i][j] >= max) {
        break;
      }
    }
    console.log("scoreRight: " + scoreRight);
    // going left
    for (let i = x, j = y - 1; j >= 0; j--) {
      scoreLeft += 1;
      if (gridLines[i][j] >= max) {
        break;
      }
    }
    console.log("scoreLeft: " + scoreLeft);
    // going down
    for (let i = x + 1, j = y; i < gridLines.length; i++) {
      scoreDown += 1;
      if (gridLines[i][j] >= max) {
        break;
      }
    }
    console.log("scoreDown: " + scoreDown);
    // going up
    for (let i = x - 1, j = y; i >= 0; i--) {
      scoreUp += 1;
      if (gridLines[i][j] >= max) {
        break;
      }
    }
    console.log("scoreUp: " + scoreUp);

    tempScenicScore = scoreRight * scoreLeft * scoreDown * scoreUp;
    //chekc the largest sceenic score
    if (tempScenicScore > maxScenicScore) {
      maxScenicScore = tempScenicScore;
    }
    console.log();
  });

  console.log("Maximum scenic score:");
  console.log(maxScenicScore);
}

main();
