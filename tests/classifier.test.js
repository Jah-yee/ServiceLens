import { describe, it, expect } from 'vitest';
import { classifyRequest } from '../src/lib/classifier.js';

describe('classifyRequest — internal/noise filtering', () => {
  it('marks chrome:// URLs as internal', () => {
    expect(classifyRequest('chrome://extensions')).toBe('internal');
  });

  it('marks data: URLs as internal', () => {
    expect(classifyRequest('data:text/plain,hello')).toBe('internal');
  });

  it('marks Vite HMR URLs as internal', () => {
    expect(classifyRequest('http://localhost:5173/@vite/client')).toBe('internal');
    expect(classifyRequest('http://localhost:5173/@react-refresh')).toBe('internal');
    expect(classifyRequest('http://localhost:5173/node_modules/.vite/chunk.js')).toBe('internal');
  });

  it('marks Next.js static chunks as internal', () => {
    expect(classifyRequest('http://localhost:3000/_next/static/chunks/app.js')).toBe('internal');
    expect(classifyRequest('http://localhost:3000/_next/static/css/main.css')).toBe('internal');
  });

  it('marks favicon requests as internal', () => {
    expect(classifyRequest('http://localhost:3000/favicon.ico')).toBe('internal');
  });

  it('marks Google Fonts as internal', () => {
    expect(classifyRequest('https://fonts.googleapis.com/css2?family=Roboto')).toBe('internal');
    expect(classifyRequest('https://fonts.gstatic.com/s/roboto/v30/roboto.woff2')).toBe('internal');
  });
});

describe('classifyRequest — subdomain heuristic', () => {
  it('extracts service name from 3-label hostname', () => {
    expect(classifyRequest('https://auth.example.com/token')).toBe('auth');
    expect(classifyRequest('https://payments.myapp.com/charge')).toBe('payments');
  });

  it('ignores generic subdomains and falls through to path', () => {
    expect(classifyRequest('https://api.example.com/users')).toBe('users');
    expect(classifyRequest('https://www.example.com/products')).toBe('products');
  });
});

describe('classifyRequest — path heuristic', () => {
  it('extracts first meaningful path segment', () => {
    expect(classifyRequest('http://localhost:8080/api/v1/users/123')).toBe('users');
    expect(classifyRequest('http://localhost:8080/api/v2/food-requests?page=0')).toBe('food-requests');
    expect(classifyRequest('https://example.com/rest/orders/456')).toBe('orders');
  });

  it('skips UUIDs and numeric IDs', () => {
    expect(classifyRequest('https://example.com/api/products/54A13E98-7409-421E-BE49-13B666A562FF')).toBe('products');
    expect(classifyRequest('https://example.com/api/items/42/details')).toBe('items');
  });

  it('falls back to hostname when path yields nothing', () => {
    expect(classifyRequest('https://example.com/api/v1')).toBe('example.com');
  });
});

describe('classifyRequest — user-defined serviceMap rules', () => {
  const serviceMap = [
    { type: 'path', pattern: '/api/food', service: 'food-service' },
    { type: 'subdomain', pattern: 'auth', service: 'auth-service' },
  ];

  it('matches path rule before auto-detection', () => {
    expect(classifyRequest('http://localhost:8080/api/food-requests', serviceMap)).toBe('food-service');
  });

  it('matches subdomain rule before auto-detection', () => {
    expect(classifyRequest('https://auth.example.com/token', serviceMap)).toBe('auth-service');
  });

  it('falls through to auto-detection when no rule matches', () => {
    expect(classifyRequest('https://payments.example.com/charge', serviceMap)).toBe('payments');
  });
});
