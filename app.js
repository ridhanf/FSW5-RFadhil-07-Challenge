// Import Module
const express = require('express');
const morgan = require('morgan');
const gameRouter = require('./routes/game.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const errorMiddleware = require('./utils/error.middleware');
const homeController = require('./controllers/home.controller');

// Activte Express Module
const app = express();

// view engine / template engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

// Routing (Endpoints and Handlers)
app.get('/', homeController.showHomePage);
app.use('/game', gameRouter);
app.use('/dashboard', dashboardRouter);

// Error Handlers
app.use(errorMiddleware.errorHandler); // Internal Server Error Handler
app.use(errorMiddleware.error404Handler); // Error 404 Handler

module.exports = app;
