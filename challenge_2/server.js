let bodyParser = require('body-parser')
let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();

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

app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('go to /index.html');
})

app.post('/posty', (req, res) => {
  let json = JSON.parse(req.body.text);

  var processJSON = (json) => {
    const arrOfObjs = [];
    arrOfObjs.push(json);

    const generateObjs = (obj) => {
      for (let i = 0; i < obj.children.length; i++) {
        arrOfObjs.push(obj.children[i]);
        generateObjs(obj.children[i]);
      }
    }
    generateObjs(json);

    console.log(arrOfObjs);

    return arrOfObjs;
  }

  let objArray = processJSON(json);

  const lines = objArray.map(obj => {
    return generateLines(obj);
  });

  lines.unshift(generateColumns(json))
  console.log(lines);

  lines.forEach((line) => {
    fs.appendFile(path.join(__dirname, 'csv_files', 'csv_report.csv'), line + '\n', (err) => {
      if (err) {
        throw err;
      }
    })
  })



  res.send('posty received');
})

app.listen(8080, () => {
  console.log('listening on port 8080');
})


