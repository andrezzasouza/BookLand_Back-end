import connection from '../database/database.js';
import { tokenSchema } from '../validations/tokenValidation.js';

async function header(req, res) {
  const notLoggedIn = "You're not logged in. Please, refresh the page and try again!";
  const serverError = "It wasn't possible to access the server. Please, try again later!";
  const invalidData = 'Something is wrong with your request. Please, refresh the page and try again!';

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  // eslint-disable-next-line no-console
  console.log(token);
  // eslint-disable-next-line no-console
  console.log(token.length);
  // eslint-disable-next-line no-console
  console.log(typeof token);

  if (!token) return res.status(401).send(notLoggedIn);

  const isCorrectToken = tokenSchema.validate(token);

  if (isCorrectToken.error) {
    // eslint-disable-next-line no-console
    console.log(isCorrectToken.error);
    return res.status(400).send(invalidData);
  }

  try {
    const search = await connection.query(
      `
        SELECT * FROM "Sessions" WHERE token = $1
      `,
      [token],
    );

    if (search.rowCount === 0) {
      return res.status(410).send(notLoggedIn);
    }

    await connection.query(
      `
        DELETE FROM "Sessions" WHERE token = $1
      `,
      [token],
    );

    return res.sendStatus(200);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(500).send(serverError);
  }
}

export default header;
