const { Pool } = require('pg');
const dbCredentials = require('../database');
const {
  dev: {
    user,
    password,
    host,
    database,
  }
} = dbCredentials;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: 5432,
});

module.exports = async function doAction(data) {
  const client = await pool.connect();
  try {
    const res = await Promise.all(
      data.map(({ method, args }) => (
        client[method](...args)
      ))
    );
    client.release();
    return res;
  } catch (e) {
    console.log(e);
    client.release();
  }
};
