let fs = require('fs');
let path = require('path');

const arrToString = (arrayOfstrs) => {
  let newStr = '';
  for (let i = 0; i < arrayOfstrs.length; i++) {
    if (i === arrayOfstrs.length - 1) {
      newStr += arrayOfstrs[i];
    }
    else {
      newStr += (arrayOfstrs[i] + ',');
    }
  }
  return newStr;
}

const generateColumns = (obj) => {
  let columns = Object.keys(obj).slice(0, Object.keys(obj).length - 1);
  let columnsStr = arrToString(columns);
  return columnsStr;
}

const processJSON = (json) => {
  const arrOfObjs = [];
  arrOfObjs.push(json);

  const generateObjs = (obj) => {
    for (let i = 0; i < obj.children.length; i++) {
      arrOfObjs.push(obj.children[i]);
      generateObjs(obj.children[i]);
    }
  }
  generateObjs(json);

  return arrOfObjs;
}

const generateLines = (obj) => {
  let keys = Object.keys(obj);
  let line = '';
  for (let i = 0; i < keys.length - 1; i++) {
    if (i === keys.length - 2) {
      line += obj[keys[i]];
    } else {
      line += (obj[keys[i]] + ',');
    }
  }
  return line;
}

const writeFile = (json, cb) => {
  let objArray = processJSON(json);
  const lines = objArray.map(obj => {
    return generateLines(obj);
  });
  lines.unshift(generateColumns(json))
  lines.forEach((line) => {
    fs.appendFile(path.join(__dirname, 'csv_files', 'csv_report.csv'), line + '\n', (err) => {
      if (err) {
        throw err;
      } else {
        cb(null);
      }
    });
  });
}

module.exports = {
  arrToString: arrToString,
  generateColumns: generateColumns,
  processJSON: processJSON,
  generateLines: generateLines,
  writeFile: writeFile
}
