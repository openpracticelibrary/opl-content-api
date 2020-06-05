module.exports = ({ env }) => {
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'mongoose',
        settings: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env('DATABASE_PORT', 27017),
          database: env('DATABASE_NAME', 'strapi'),
          username: env('DATABASE_USERNAME', '' ),
          password: env('DATABASE_PASSWORD', ''),
        },
        options: {}
      }
    }
  };
};
