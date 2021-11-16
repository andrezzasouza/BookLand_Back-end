import connection from '../database/database.js';

async function home(req, res) {
  const serverError = "It wasn't possible to access the server. Please, try again later!";
  try {
    const result = await connection.query(
      `
       SELECT * FROM "Books" WHERE quantity > 0;
      `,
    );
    if (result.rowCount === 0) {
      return res.sendStatus(204);
    }
    return res.status(200).send(result.rows);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(500).send(serverError);
  }
}

export default home;
