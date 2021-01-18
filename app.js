// Import Module
const express = require('express');
const morgan = require('morgan');

// Activte Express Module
const app = express();

// Port Declaration
const PORT = 3000;

// view engine / template engine
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('./index.ejs');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`)
})
