const moment = require('moment-timezone');
const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;

const vancTimeCommand = {
  supports(input) {
    return input.content.match(IS_GET_VANCOUVER_TIME_REGEX) !== null;
  },
  process(input) {
    const vancouverDateTime = moment()
      .tz('America/Vancouver')
      .locale('fr')
      .format('LT');
    input.channel.send(`:flag_ca: ${vancouverDateTime} :maple_leaf:`);
  },
};

module.exports = vancTimeCommand;
