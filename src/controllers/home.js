import connection from '../database/database.js';

async function home(req, res) {
  // return res.send(process.env);
  try {
    const result = await connection.query(`
      SELECT * FROM "Books"
    `);

    if (result.rowCount === 0) {
      return res.sendStatus(204);
    }
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export default home;
