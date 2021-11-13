import connection from '../database/database.js';

// eslint-disable-next-line consistent-return
async function home(req, res) {
  try {
    const result = await connection.query(
      `
       SELECT * FROM "Books" WHERE quantity > 0;
      `,
    );
    if (result.rowCount === 0) {
      return res.sendStatus(204);
    }
    res.status(200).send(result.rows);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.sendStatus(500);
  }
}

export default home;
