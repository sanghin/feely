const { promisify } = require('util');
const redisClient = require('../store/redisClient');
const { PATH_TO_STATIC_IMG_FOLDER, TWELVE_HOURS, IS_URL_REGEX } = require('../utility/const');
const moment = require('moment');
const SHA256 = require('crypto-js/sha256');

const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * This command checks if links are posted multiple times.
 * If it is then we delete it and warn user it has been a repost.
 */
class repostCommand {
  /**
   * Input content must match an URL regex and being posted.
   *
   * @param {Message} input
   * @param {String} context
   * @returns {boolean}
   */
  static supports(input, context) {
    return input.content.match(IS_URL_REGEX) !== null && context === 'post';
  }

  /**
   * Check if message exists in Redis, if yes blame and delete, if no store it.
   *
   * @param {Message} input
   */
  static process(input) {
    const hashedUrl = SHA256(input.content).toString();

    getAsync(hashedUrl)
      .then((res) => {
        if (!input.deletable) {
          return;
        }

        this.blameAndDelete(res, input);
      })
      .catch(reason => this.storeLink(reason, input, hashedUrl));
  }

  /**
   * IT'S A REPOST :SCREAM:
   * delete the input, send the repost PNG
   * and blame the user with a custom blame input
   *
   * @param {Object} reply
   * @example {"user":"m3galo","channel":"testbot","date":"2018-01-28T21:15:26.574Z","id":"4"}
   * @param {Message} input
   */
  static blameAndDelete(reply, input) {
    const data = JSON.parse(reply);
    const date = moment(new Date(data.date));
    const blameMessage = `${data.user} posted this in #${data.channel} on ${date.fromNow()}`;
    input.channel.send(blameMessage, {
      file: `${PATH_TO_STATIC_IMG_FOLDER}/no_repost.jpg`,
    });
    input.delete();
  }

  /**
   * link is fresh or at least 12 hours old
   * save the hash and links meta in redis for 12 hours
   *
   * @param {Object} reply
   * @param {Message} input
   * @param {String} hashedUrl
   */
  static storeLink(reply, input, hashedUrl) {
    const data = {
      user: input.author.username,
      channel: input.channel.name,
      date: input.createdAt,
      id: input.id,
    };
    redisClient.set(hashedUrl, JSON.stringify(data), 'EX', TWELVE_HOURS);
  }
}

module.exports = repostCommand;
