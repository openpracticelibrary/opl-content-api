const request = require('supertest');

describe('Strapi admin ui', () => {
  it('should be available', (done) => {
    request('http://localhost:1337/admin')
      .get('/')
      .expect(200, done);
  });
});

