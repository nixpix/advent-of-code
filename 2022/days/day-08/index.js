const fs = require("fs");

function main() {
  let file;
  try {
    file = fs.readFileSync("input-0.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let gridLines = file.split("\n");
  console.log(gridLines)
  let visible = 0;
  
  // rows
  for (let i = 0; i < gridLines.length; i++) {
    // console.log(gridLines[i])
    for (let j = 0; j < gridLines[i].length; j++) {
      // console.log(gridLines[i][j])
    }
    
  }

  // columns
  for (let i = 0; i < gridLines.length; i++) {
    // console.log(gridLines[i])
    for (let j = 0; j < gridLines[i].length; j++) {
      console.log(gridLines[j][i])
      
    }
    console.log()
  }
    

}

main();
