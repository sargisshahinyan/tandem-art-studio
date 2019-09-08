import { Pool } from 'pg';
import dbCredentials from '../database';
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

export async function doAction(data) {
  const client = await pool.connect();
  try {
    const res = await Promise.all(
      Object.entries(data).map(([method, args]) => (
        client[method](...args)
      ))
    );
    client.release();
    return res;
  } catch (e) {
    client.release();
  }
}

export default doAction;
