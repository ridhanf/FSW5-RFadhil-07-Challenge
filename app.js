// Import Module
const express = require('express');
const morgan = require('morgan');

// Activte Express Module
const app = express();

// Port Declaration
const PORT = 3000;

// view engine / template engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('./index.ejs');
})

app.get('/game-trial', (req, res) => {
  res.render('./game.ejs');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`)
})
