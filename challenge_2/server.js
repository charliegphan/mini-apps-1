let bodyParser = require('body-parser')
let express = require('express');
let controller = require('./controller')

let app = express();

app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('go to /index.html');
})

app.post('/posty', (req, res) => {
  controller.writeFile(JSON.parse(req.body.text), (err, lines) => {
    res.send(JSON.stringify(lines))
  });
})

app.listen(8080, () => {
  console.log('listening on port 8080');
})


