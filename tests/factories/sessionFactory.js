import faker from 'faker';
import connection from '../../src/database/database';

const createToken = {
  token: faker.datatype.uuid,
};

// eslint-disable-next-line no-console
console.log(createToken.token);

const badToken = {
  token: 123456,
};

const createSession = async (token) => {
  await connection.query(
    `
      INSERT INTO "Sessions"
      (token)
      VALUES($1);
    `,
    [token],
  );
};

export { createToken, badToken, createSession };
