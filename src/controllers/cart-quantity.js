/* eslint-disable no-console */
/* eslint-disable dot-notation */
import connection from '../database/database.js';
import { cartQuantitySchema } from '../validations/bodyValidations.js';

async function cartQuantity(req, res) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');

  const isCorrectBody = cartQuantitySchema.validate(req.body);
  if (isCorrectBody.error) {
    return res.status(400).send(isCorrectBody.error.details[0].message);
  }

  const {
    bookId,
    bookQuantity,
  } = req.body;

  try {
    const obtainCartId = await connection.query(`
        SELECT "Carts".id FROM "Carts" 
        JOIN "Sessions" 
            ON "Carts".user_id = "Sessions".user_id 
        WHERE "Sessions".token = $1;
    `, [token]);

    if (obtainCartId.rowCount === 0) {
      return res.status(403).send('Your session token has expired or you haven`t logged in yet!');
    }

    const cartId = obtainCartId.rows[0].id;

    await connection.query(`
      UPDATE "Cart_books" SET 
        book_quantity = $3
        WHERE cart_id = $1 AND book_id = $2;
    `, [cartId, bookId, bookQuantity]);

    return res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export default cartQuantity;
