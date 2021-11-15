import faker from 'faker';
import connection from '../../src/database/database';
import { user, createUser } from './userFactory';

const createToken = {
  token: faker.datatype.uuid,
};

// eslint-disable-next-line no-console
console.log(createToken.token);

const badToken = {
  token: 123456,
};

const createSession = async (token) => {
  createUser(user);
  await connection.query(
    `
      INSERT INTO "Sessions"
      (user_id, token)
      VALUES($1, $2);
    `,
    [token],
  );
};

export { createToken, badToken, createSession };
