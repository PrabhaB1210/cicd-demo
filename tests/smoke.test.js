// ============================================================
// SMOKE TESTS  (CD Stage — runs after deploy to staging)
// Book ref: Chapter 8 — "Smoke testing: a short and quick
// testing method that checks the basic functionality of the
// application. Usually applied after a release."
// ============================================================

const request = require('supertest');
const app = require('../app/index');

describe('SMOKE — Staging Sanity Checks', () => {
  test('API is reachable and healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('Ticket booking endpoint is responding', async () => {
    const res = await request(app)
      .post('/tickets')
      .send({ passenger: 'SmokeUser', from: 'Pune', to: 'Hyderabad', date: '2025-09-01' });
    // Just check it doesn't crash — 201 means we're live
    expect(res.statusCode).toBe(201);
  });

  test('Ticket listing endpoint is responding', async () => {
    const res = await request(app).get('/tickets');
    expect(res.statusCode).toBe(200);
  });
});
