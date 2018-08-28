let express = require('express');
let app = express();

app.use(express.static('./client'));

app.get('/', (req, res) => {
  res.send('go to /index.html');
})

app.listen(8080, () => {
  console.log('listening on port 8080');
})

