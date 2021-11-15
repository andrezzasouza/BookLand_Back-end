import '../src/setup.js';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import clearDatabase from './factories/tableFactory.js';

beforeEach(async () => {
  await clearDatabase();
});

afterAll(() => {
  connection.end();
});

describe('DELETE /header', () => {
  it('returns 401 when no token is sent', async () => {
    const result = await supertest(app).delete('/header');
    expect(result.status).toEqual(401);
  });

  it('returns 400 when token format is incorrect', async () => {
    const result = await supertest(app).delete('/header').set('Authorization', '156_87*95');
    expect(result.status).toEqual(400);
  });

  it('returns 410 when the sessions has already been deleted', async () => {
    const realToken = uuid();
    // generate valid, but non-existant token
    const result = await supertest(app).delete('/header').set('Authorization', realToken);
    expect(result.status).toEqual(410);
  });

  it('returns 200 for success when session is deleted', async () => {
    // create user
    // sign in with this user
    // get the user's token
    // delete the token
    const result = await supertest(app).delete('/header');
    expect(result.status).toEqual(200);
  });
});