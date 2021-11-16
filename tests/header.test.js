import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import clearDatabase from './factories/tableFactory.js';
import {
  createSession,
  realToken,
  badToken,
  token,
} from './factories/sessionFactory';

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
    const result = await supertest(app).delete('/header').set('Authorization', badToken);
    expect(result.status).toEqual(400);
  });

  it('returns 410 when the sessions has already been deleted', async () => {
    const result = await supertest(app).delete('/header').set('Authorization', realToken);
    expect(result.status).toEqual(410);
  });

  it('returns 200 for success when session is deleted', async () => {
    await createSession();
    const result = await supertest(app).delete('/header').set('Authorization', token);
    expect(result.status).toEqual(200);
  });
});
