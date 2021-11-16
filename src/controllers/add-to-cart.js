/* eslint-disable no-trailing-spaces */
import connection from '../database/database.js';
import { tokenSchema } from '../validations/tokenValidation.js';
import { addToCartSchema } from '../validations/bodyValidations.js';

async function addToCart(req, res) {
  const notLoggedIn = "You're not logged in. Please, refresh the page and try again!";
  const serverError = "It wasn't possible to access the server. Please, try again later!";
  const invalidData = 'Something is wrong with your request. Please, refresh the page and try again!';
  const tokenNotFound = 'Your session token has expired or you haven`t logged in yet!';
  const bookNotFound = "We couldn't find this book. We may have run out of stock. Reload and try again, please!";
  const bookAlreadyAdded = 'You have already added this book to your cart. See your cart to alter the quantity you want to buy.';

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).send(notLoggedIn);

  const isCorrectToken = tokenSchema.validate(token);

  if (isCorrectToken.error) {
    return res.status(400).send(invalidData);
  }

  try {
    const checkToken = await connection.query(
      `
        SELECT * FROM "Sessions" WHERE token = $1;
      `,
      [token],
    );

    if (checkToken.rowCount === 0) {
      return res.status(403).send(tokenNotFound);
    }

    const userId = checkToken.rows[0].user_id;
    
    const isCorrectBody = addToCartSchema.validate(req.body);
    if (isCorrectBody.error) {
      return res.status(400).send(invalidData);
    }

    const {
      id,
    } = req.body;

    const checkBook = await connection.query(
      `
        SELECT * FROM "Books" WHERE id = $1;
      `,
      [id],
    );

    if (checkBook.rowCount === 0) {
      return res.status(404).send(bookNotFound);
    }

    const checkCart = await connection.query(
      `
        SELECT * FROM "Carts" WHERE user_id = $1;
      `,
      [userId],
    );

    let cartId;
    
    if (checkCart.rowCount > 0) {
      cartId = checkCart.rows[0].id;
    }
    
    if (checkCart.rowCount === 0) {
      const createCart = await connection.query(
        `
          INSERT INTO "Carts" (user_id) VALUES ($1) RETURNING id;
        `,
        [userId],
      );
      // eslint-disable-next-line no-console
      console.log(createCart);
      // cartId = createCart.rows[0].id;
    }

    const alreadyAdded = await connection.query(
      `
        SELECT * FROM "Cart_books" WHERE book_id = $1 AND cart_id = $2;
      `,
      [id, cartId],
    );

    if (alreadyAdded.rowCount > 0) {
      return res.status(409).send(bookAlreadyAdded);
    }

    await connection.query(
      `
        INSERT INTO "Cart_books" (book_id, cart_id) VALUES ($1, $2);
      `,
      [id, cartId],
    );

    return res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(500).send(serverError);
  }
}

export default addToCart;
