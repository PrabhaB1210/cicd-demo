const express = require('express');
const app = express();
app.use(express.json());

// In-memory store (no DB needed for demo)
const tickets = [];
let nextId = 1;

// Health check — used by smoke tests after deployment
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'IRCTC Demo API' });
});

// Book a ticket
app.post('/tickets', (req, res) => {
  const { passenger, from, to, date } = req.body;
  if (!passenger || !from || !to || !date) {
    return res.status(400).json({ error: 'passenger, from, to, and date are required' });
  }
  const ticket = { id: nextId++, passenger, from, to, date, status: 'CONFIRMED' };
  tickets.push(ticket);
  res.status(201).json(ticket);
});

// Get all tickets
app.get('/tickets', (req, res) => {
  res.json(tickets);
});

// Get ticket by ID
app.get('/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
});

// Cancel a ticket
app.delete('/tickets/:id', (req, res) => {
  const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Ticket not found' });
  tickets[index].status = 'CANCELLED';
  res.json(tickets[index]);
});

module.exports = app;
