// Import Module
const express = require('express');
const morgan = require('morgan');
const gameRouter = require('./router-game.js')

// Activte Express Module
const app = express();

// Port Declaration
const PORT = 3000;

// view engine / template engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(morgan('dev'));
app.use('/game', gameRouter)

// Routing (Enpoints and Handlers)
app.get('/', (req, res) => {
  res.render('./index.ejs').status(200);
})

// // Internal Server Error Handler
// app.use((err, req, res, next) => {
//   console.log("Ada error")
//   console.log(typeof err);
//   if (err) {
//     console.log(err);
//   }
//   res.status(500).json({
//     status: 'error',
//     error: err
//   })
// })

// // 404 Handler
// app.use((req, res, next) => {
//   console.log("Masuk 404");
//   res.status(404).json({
//     status: 'error',
//     error: 'Page not found'
//   })
// })

// Running Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`)
})
