const request = require('supertest');

describe('Strapi GraphQL endpoint', () => {
  it('should be available', (done) => {
    request('http://localhost:1337')
      .post('/graphql')
      .send({ query: '{ practices { id } }'})
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
