const request = require('supertest');
const { app, server } = require('./index');

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
  };
  return { Pool: jest.fn(() => mPool) };
});

afterAll((done) => {
  server.close(done);
});

describe('GET /health', () => {
  it('200 avec status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('POST /users', () => {
  it('400 si name ou email manquant', async () => {
    const res = await request(app).post('/users').send({ name: 'Alice' });
    expect(res.statusCode).toBe(400);
  });
});