module.exports = ({ env }) => {
  return {
    'host': 'localhost',
    'port': `${env.PORT || 1337}`,
    'production': true,
    'proxy': {
      'enabled': false
    },
    'cron': {
      'enabled': false
    },
    'admin': {
      'autoOpen': false
    }
  };
};
