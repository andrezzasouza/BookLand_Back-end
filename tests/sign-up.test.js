import faker from 'faker';
import { generate as generateCPF } from 'gerador-validador-cpf';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import '../src/setup.js';

beforeEach(async () => {
  await connection.query('DELETE FROM "Users"');
  await connection.query('DELETE FROM "Carts"');
});

afterAll(() => {
  connection.end();
});

const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  CPF: generateCPF(),
  password: 'Bookland123@',
};

const createUser = async () => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  await connection.query(
    `
        INSERT INTO "Users"
        (name, email, password, CPF)
        VALUES ($1, $2, $3, $4);
    `,
    [user.name, user.email, hashedPassword, user.CPF],
  );
};

describe('POST /sign-up', () => {
  it('returns 201 for signing up sucess', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send(user);
    expect(result.status).toEqual(201);
  });

  it('returns 400 for incorrect body', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send({
        name: user.name,
        email: user.email,
        password: 'oi',
        CPF: user.CPF,
      });
    expect(result.status).toEqual(400);
  });

  it('returns 409 for email already registered', async () => {
    await createUser();

    const result = await supertest(app)
      .post('/sign-up')
      .send(user);
    expect(result.status).toEqual(409);
  });
});
