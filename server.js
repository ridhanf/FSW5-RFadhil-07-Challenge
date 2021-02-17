const app = require('./app');
const PORT = process.env.PORT || 3000;

// Running Server
app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT} (http://localhost:${PORT})`)
});
