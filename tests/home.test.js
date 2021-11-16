import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import clearDatabase from './factories/tableFactory.js';
import { author, books, addBooks } from './factories/homeFactory.js';

beforeEach(async () => {
  await clearDatabase();
});

afterAll(() => {
  connection.end();
});

describe('GET /home', () => {
  it('returns 204 for success when there are no books to load', async () => {
    const result = await supertest(app).get('/home');
    expect(result.status).toEqual(204);
  });

  it('returns 200 for success when there are books to load', async () => {
    await addBooks(
      books.name,
      books.description,
      books.price,
      books.image,
      books.quantity,
      books.publisher,
      books.pages,
      author.name,
    );
    const result = await supertest(app).get('/home');
    expect(result.status).toEqual(200);
  });
});
