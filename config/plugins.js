module.exports = ({ env }) => ({
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: true,
    federation: true
  },
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'openpracticelibraryteam@gmail.com',
      defaultReplyTo: 'openpracticelibraryteam@gmail.com',
    },
  },
});

