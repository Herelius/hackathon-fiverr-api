require('dotenv').config();

function getEnv(varibale) {
  const value = process.env[varibale];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${varibale}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

const PORT = getEnv(`PORT`);
const DATABASE_URL = getEnv(`DATABASE_URL`);
const API_BASE_URL = getEnv(`API_BASE_URL`);

module.exports = {
  getEnv,
  PORT,
  DATABASE_URL,
  API_BASE_URL,
};
