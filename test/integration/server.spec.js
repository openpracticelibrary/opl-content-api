const request = require('supertest');

describe('Strapi server', () => {
  it('should return 200', (done) => {
    request('http://localhost:1337')
      .get('/')
      .expect(200, done);
  });
});
