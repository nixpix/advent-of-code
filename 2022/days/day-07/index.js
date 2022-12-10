const fs = require("fs");

function main() {
  let file;
  try {
    file = fs.readFileSync("input-1.txt", "utf8");
  } catch (err) {
    console.error(err);
  }

  let lines = file.split("\n");
  let traversalStack = [];
  let sizes = new Map();

  for (let line of lines) {
    // handle commands
    if (line[0] === "$") {
      line = line.slice(2);
      line = line.split(" ");
      if (line[0] === "ls") {
      } else if (line[0] === "cd") {
        if (line[1] === "..") {
          traversalStack.pop();
        } else if (line[1] === "/") {
          traversalStack = [];
        } else {
          let directory = line[1];
          traversalStack.push(directory);
        }
      }
    } else {
      line = line.split(" ");
      if (line[0] !== "dir") {
        for (let i = 0; i < traversalStack.length + 1; i++) {
          path = "/" + traversalStack.slice(0, i).join("/");
          if (sizes[path] == null) {
            sizes[path] = 0;
            sizes[path] += parseInt(line[0]);
            // console.log("sizes: " + JSON.stringify(sizes));
          } else {
            sizes[path] += parseInt(line[0]);
          }
        }
      } else {
      }
    }
  }

  // Part 1
  const sumOfValuesLessThanOrEqualTo100000 = (sizes) => {
    const values = Object.values(sizes);
    const filteredValues = values.filter((v) => v <= 100000);
    return filteredValues.reduce((acc, cur) => acc + cur, 0);
  };
  sum = sumOfValuesLessThanOrEqualTo100000(sizes);

  console.log(JSON.stringify(sizes, null, 4));
  console.log("Result: " + sum);

  const convertObjectToArray = (sizes) => {
    const fileTreeArray = [];
    for (const size in sizes) {
      console.log(size);
      object = [size, sizes[size]];
      fileTreeArray.push(object);
    }
    return fileTreeArray;
  };

  const fileTreeArray = convertObjectToArray(sizes);
  console.log("Array: " + JSON.stringify(fileTreeArray, null, 4));

  // Part 2
  let totalDiskSize = 70000000;
  let spaceNeeded = 30000000;
  let rootFolderSize = sizes[Object.keys(sizes)[0]];
  let unused = totalDiskSize - rootFolderSize;
  let needed = spaceNeeded - unused;

  let minFolderSize = Math.min(...Object.values(sizes).filter((el) => el >= needed));

  console.log("Smallest folder to delete: " + minFolderSize);
}

main();
