/* eslint-disable dot-notation */
import connection from '../database/database.js';

async function getCartProducts(req, res) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');

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

    const obtainUserCartBooks = await connection.query(`
        SELECT "Books".* FROM "Books" JOIN "Cart_books" ON "Cart_books".book_id = "Books".id WHERE "Cart_books".cart_id = $1;
    `, [cartId]);

    if (obtainUserCartBooks.rowCount === 0) {
      return res.status(204).send([]);
    }

    const userCartBooks = obtainUserCartBooks.rows;

    return res.send(userCartBooks);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

async function deleteCartProduct(req, res) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');

  const { bookId } = req.body;

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
        DELETE FROM "Cart_books" WHERE cart_id = $1 AND book_id = $2;
    `, [cartId, bookId]);

    return res.sendStatus(200);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export { getCartProducts, deleteCartProduct };
