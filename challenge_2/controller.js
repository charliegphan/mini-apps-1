let fs = require('fs');
let path = require('path');
let sprintf = require('sprintf-js').sprintf;

const generateColumns = (obj) => {
  let columns = Object.keys(obj).slice(0, Object.keys(obj).length - 1);
  columns = columns.map(column => {
    return column.padStart(21, ' ').toUpperCase();
  });

  return columns.join('');
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
    let val = obj[keys[i]].toString();
    if (i === keys.length - 2) {
      line += val.padStart(21, ' ');
    } else {
      line += (val.padStart(21, ' '));
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

  var row = 0;
  lines.forEach((line) => {
    row++;
    fs.appendFileSync(path.join(__dirname, 'csv_files', 'csv_report.csv'),
      row + ' ' + line + '\n', 'utf8', (err) => {
        if (err) {
          throw err;
        } else {
          console.log('The "data to append" was appended to file!');
        }
      });
  });

  cb(null, lines);
}

const readFile = (cb) => {
  fs.readFile(path.join(__dirname, 'csv_files', 'csv_report.csv'),
    'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const lines = data.split('\n');
      cb(lines);
    }
  )
}

module.exports = {
  writeFile: writeFile,
  readFile: readFile
}
