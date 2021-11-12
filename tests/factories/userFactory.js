import faker from 'faker';
import bcrypt from 'bcrypt';
import { generate as generateCPF } from 'gerador-validador-cpf';
import connection from '../../src/database/database.js';

const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  CPF: generateCPF(),
  password: 'Bookland123@',
};

const createUser = async (name, email, CPF, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await connection.query(
    `
          INSERT INTO "Users"
          (name, email, password, CPF)
          VALUES ($1, $2, $3, $4);
      `,
    [name, email, hashedPassword, CPF],
  );
};

export { user, createUser };
