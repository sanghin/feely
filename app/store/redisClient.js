const {REDIS_URL} = require('../utility/const');

const redisClientoptions = REDIS_URL ? {url: REDIS_URL} : {};
const redis = require('redis').createClient(redisClientoptions);

redis.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('REDIS OK');
});

module.exports = redis;
