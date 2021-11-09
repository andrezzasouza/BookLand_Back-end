/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../validations/bodyValidations.js';

const selectUsers = 'SELECT * FROM users';
const passwordRules = 'Your password must contain at least 8 characters, 1 upper case letter, 1 lower case letter, 1 number and 1 special character.';
const CPFRules = 'Your CPF must only contain 11 numbers';

async function signUp(req, res) {
  const isCorrectBody = signUpSchema.validate(req.body);
  if (isCorrectBody.error) {
    if (isCorrectBody.error.details[0].path[0] === 'password') {
      return res.status(400).send(passwordRules);
    }
    if (isCorrectBody.error.details[0].path[0] === 'CPF') {
      return res.status(400).send(CPFRules);
    }
    return res.status(400).send(isCorrectBody.error.details[0].message);
  }

  const {
    name, email, password, CPF,
  } = req.body;

  try {
    const isEmailAlreadyRegistered = await connection.query(
      `${selectUsers} WHERE email = $1`, [email],
    );
    if (isEmailAlreadyRegistered.rowCount !== 0) {
      return res.status(409).send(`${email} is already registered!`);
    }
    const isCPFAlreadyRegistered = await connection.query(
      `${selectUsers} WHERE CPF = $1`, [CPF],
    );
    if (isCPFAlreadyRegistered.rowCount !== 0) {
      return res.status(409).send(`${CPF} is already registered!`);
    }

    const hashedPassword = bcrypt.hashSync(password, 11);
    await connection.query(
      `
        INSERT INTO users
        (name, email, password, CPF)
        VALUES ($1, $2, $3, $4);
      `,
      [name, email, hashedPassword, CPF],
    );

    const newUser = await connection.query(`${selectUsers} WHERE email = $1`, [email]);
    const userId = newUser.rows[0].id;

    await connection.query(
      `
        INSERT INTO carts
        ("user_id")
        VALUES ($1);
      `,
      [userId],
    );

    res.sendStatus(201);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.sendStatus(500);
  }
}

export default signUp;
