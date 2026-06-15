// ============================================================
// UNIT TESTS  (CI Stage 1)
// Book ref: Chapter 8 — "Unit testing: used to test a single
// unit of code, such as a class or function."
// ============================================================

const request = require('supertest');
const app = require('../app/index');

describe('UNIT — Health Check', () => {
  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('UNIT — Ticket Validation', () => {
  test('POST /tickets with missing fields returns 400', async () => {
    const res = await request(app)
      .post('/tickets')
      .send({ passenger: 'Prabdee' }); // missing from, to, date
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /tickets with all fields returns 201 and CONFIRMED status', async () => {
    const res = await request(app)
      .post('/tickets')
      .send({ passenger: 'Prabdee', from: 'Bengaluru', to: 'Mumbai', date: '2025-07-01' });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('CONFIRMED');
    expect(res.body.id).toBeDefined();
  });
});
