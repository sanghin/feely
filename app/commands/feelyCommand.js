const IS_FEELY_INVOKED = /^!f(eely)?$/;

const { helpMessage } = require('../client/discord');

class feelyCommand {
  static supports(input) {
    return input.content.match(IS_FEELY_INVOKED) !== null;
  }

  static process(input) {
    input.channel.send(helpMessage);
  }
}

module.exports = feelyCommand;
