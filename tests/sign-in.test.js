import '../src/setup.js';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import faker from 'faker';
import { generate as generateCPF } from 'gerador-validador-cpf';
import connection from '../src/database/database.js';
import app from '../src/app.js';

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

const del = 'DELETE FROM';

const clearDatabase = async () => {
  await connection.query(`
    ${del} "Networks";
    ${del} "Category_groups";
    ${del} "States";
    ${del} "Cities";
    ${del} "Cart_books";
    ${del} "Carts";
    ${del} "Sessions";
    ${del} "Categories";
    ${del} "Payments";
    ${del} "Closed_deals";
    ${del} "Books_categories";
    ${del} "Addresses";
    ${del} "Books";
    ${del} "Users";
  `);
};

beforeEach(async () => {
  await clearDatabase();
});

afterAll(() => {
  connection.end();
});

describe('POST /sign-in', () => {
  it('returns 400 for incorrect body', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
      });
    expect(result.status).toEqual(400);
  });

  it('returns 404 for email not registered', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(result.status).toEqual(404);
  });

  it('returns 404 for wrong password', async () => {
    await createUser(user.name, user.email, user.CPF, user.password);

    const result = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: 'NotBookland123@',
      });
    expect(result.status).toEqual(404);
  });

  it('returns 200 for sign-in sucess', async () => {
    await createUser(user.name, user.email, user.CPF, user.password);

    const result = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(result.status).toEqual(200);
  });
});
