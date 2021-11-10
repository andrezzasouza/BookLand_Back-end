/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function signUp(req, res) {
  const {
    testing,
  } = req.body;

  try {
    await connection.query(`
        SELECT * FROM "Users"
    `);
    res.send(testing);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.sendStatus(500);
  }
}

export default signUp;
