const redisClient = require('../store/redisClient');
const { IS_URL_REGEX } = require('../utility/const');
const SHA256 = require('crypto-js/sha256');

class deleteCommand {
  static supports(input, context) {
    return input.content.match(IS_URL_REGEX) !== null && context === 'delete';
  }

  static process(input) {
    const hashedUrl = SHA256(input.content).toString();
    redisClient.get(hashedUrl, (err, reply) => {
      if (!reply) {
        return;
      }

      const data = JSON.parse(reply);
      // Only delete if it's the original link.
      if (data.id === input.id) {
        redisClient.del(hashedUrl);
      }
    });
  }
}

module.exports = deleteCommand;
