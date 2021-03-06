/* eslint-disable no-console */
import connection from '../database/database.js';
import { deliverySchema } from '../validations/bodyValidations.js';

async function postDeliveryInfo(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');

  const isCorrectBody = deliverySchema.validate(req.body);
  if (isCorrectBody.error) {
    return res.status(400).send(isCorrectBody.error.details[0].message);
  }

  const {
    state,
    city,
    district,
    street,
    CEP,
    complement,
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

    const checkIfAddressExists = await connection.query(`
        SELECT * FROM "Addresses" 
        WHERE "user_id" = $1;
    `, [userId]);

    if (checkIfAddressExists.rowCount === 0) {
      await connection.query(`
        INSERT INTO "Addresses" 
          ("user_id", state, city, district, street, cep, complement)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
    `, [userId, state, city, district, street, CEP, complement]);
    } else {
      await connection.query(`
        UPDATE "Addresses" SET 
          state = $2,
          city = $3, 
          district = $4,
          street = $5, 
          cep = $6, 
          complement = $7
        WHERE "user_id" = $1;
    `, [userId, state, city, district, street, CEP, complement]);
    }

    return res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

async function getDeliveryInfo(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).send('You are not authorized to see this content. Please try signing in.');

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

    const addressTable = await connection.query(`
        SELECT * FROM "Addresses" 
        WHERE "user_id" = $1;
    `, [userId]);

    const userAdress = addressTable.rows[0];

    return res.send(userAdress);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.sendStatus(500);
  }
}

export { postDeliveryInfo, getDeliveryInfo };
