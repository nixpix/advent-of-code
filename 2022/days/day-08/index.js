const fs = require("fs");

function main() {
  let file;
  try {
    file = fs.readFileSync("input-0.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let gridLines = file.split("\n");

  let visible = 0;

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
      } else if (gridLines[i][j] === max && gridLines[i][j] !== 0) {
        break;
      }
    }
    maxGrid[x][y] = max;
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
      } else if (gridLines[j][i] === max && gridLines[j][i] !== 0) {
        break;
      }
    }
    maxGrid[x][y] = max;
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
      } else if (gridLines[i][j] === max && gridLines[i][j] !== 0) {
        break;
      }
    }
    maxGrid[x][y] = max;
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
      } else if (gridLines[j][i] === max && gridLines[j][i] !== 0) {
        break;
      }
    }
    maxGrid[x][y] = max;
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

  console.log("Solution:");
  console.log(maxGrid);
  console.log(visible);
}

main();
