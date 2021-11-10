/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function signUp(req, res) {
  const {
    name, email, password, CPF,
  } = req.body;

  try {
    await connection.query(`
        SELECT * FROM users
    `);
    res.send(name, email, password, CPF);
    res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.sendStatus(500);
  }
}

export default signUp;
