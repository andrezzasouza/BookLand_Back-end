/* eslint-disable dot-notation */
import connection from '../database/database.js';

async function getCartProducts(req, res) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).send('nop');

  try {
    const userCartProducts = await connection.query(`
        SELECT * FROM "Books";
    `, [token]);

    if (userCartProducts.rowCount === 0) {
      return res.status(404).send('anything found');
    }

    const userCartProductsToSend = JSON.parse(userCartProducts.rows[0].records);
    return res.send(userCartProductsToSend);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export default getCartProducts;
