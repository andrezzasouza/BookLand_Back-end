/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import connection from '../database/database.js';

async function postPaymentInfo(req, res) {
  console.log('oi');
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');
  const {
    network,
    cardName,
    cardNumber,
    expirationDate,
    CVV,
  } = req.body;

  try {
    const obtainUserId = await connection.query(`
        SELECT "Users".id FROM "Users" 
        JOIN "Sessions" 
            ON "Users".id = "Sessions".user_id 
        WHERE "Sessions".token = $1;
    `, [token]);

    if (obtainUserId.rowCount === 0) {
      return res.status(403).send('Your session token has expired or you haven`t logged in yet!');
    }

    const userId = obtainUserId.rows[0].id;

    const checkIfPaymentExists = await connection.query(`
        SELECT * FROM "Payments" 
        WHERE "user_id" = $1;
    `, [userId]);

    if (checkIfPaymentExists.rowCount === 0) {
      await connection.query(`
        INSERT INTO "Payments" 
          ("user_id", name, "card number", "expiration_date", network)
        VALUES 
          ($1, $2, $3, $4, $5)
    `, [userId, cardName, cardNumber, expirationDate, network]);
    } else {
      await connection.query(`
        UPDATE "Payments" SET
            name = $2,
            "card number" = $3, 
            expiration_date = $4,
            network = $5
        WHERE "user_id" = $1;
    `, [userId, cardName, cardNumber, expirationDate, network]);
    }

    return res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export default postPaymentInfo;
