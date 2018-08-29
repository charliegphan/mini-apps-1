let express = require('express');
let path = require('path');

let app = express();

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send(path.join(__dirname, './public.index.html'))
})



app.listen(3000, () => {
  console.log('listening on port 3000 ^_^');
})