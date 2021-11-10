/* eslint-disable no-unreachable */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function signUp(req, res) {

  return res.send(process.env);
  const {
    testing,
  } = req.body;

  try {
    await connection.query(`
        SELECT * FROM "Users"
    `);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.sendStatus(500);
  }
}

export default signUp;
