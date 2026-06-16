// ============================================================
// API / SERVICE TESTS  (CI Stage 2)
// Book ref: Chapter 8 — "API/service testing: testing the
// interface between different code components or services."
// ============================================================

const request = require('supertest');
const app = require('../app/index');

describe('API — Full Ticket Lifecycle', () => {
  let ticketId;

  test('Book a ticket', async () => {
    const res = await request(app)
      .post('/tickets')
      .send({ passenger: 'Arjun', from: 'Delhi', to: 'Chennai', date: '2025-08-10' });
    expect(res.statusCode).toBe(201);
    expect(res.body.passenger).toBe('Arjun');
    ticketId = res.body.id;
  });

  test('Retrieve the booked ticket by ID', async () => {
    const res = await request(app).get(`/tickets/${ticketId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.from).toBe('Delhi');
    expect(res.body.to).toBe('Chennai');
  });

  test('List all tickets includes the booked ticket', async () => {
    const res = await request(app).get('/tickets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(t => t.id === ticketId);
    expect(found).toBeDefined();
  });

  test('Cancel the ticket changes status to CANCELLED', async () => {
    const res = await request(app).delete(`/tickets/${ticketId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('CANCELLED');
  });
});

describe('API — Error Handling', () => {
  test('GET /tickets/:id with unknown ID returns 404', async () => {
    const res = await request(app).get('/tickets/9999');
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /tickets/:id with unknown ID returns 404', async () => {
    const res = await request(app).delete('/tickets/9999');
    expect(res.statusCode).toBe(404);
  });
});
