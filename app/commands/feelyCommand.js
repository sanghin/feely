const IS_FEELY_INVOKED = /^!f(eely)?$/;

const { helpMessage } = require('../client/discord');

const feelyCommand = {
  supports(input) {
    return input.content.match(IS_FEELY_INVOKED) !== null;
  },
  process(input) {
    input.channel.send(helpMessage);
  },
};

module.exports = feelyCommand;
