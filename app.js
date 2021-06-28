const express = require('express');
const { PORT } = require('./env');

const app = express();

app.use(express.json());

// server setup
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// process setup : improves error reporting
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});

module.exports = server;
