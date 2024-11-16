// backend/server.js
const app = require('./app');
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});