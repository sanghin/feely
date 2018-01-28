const { resetVoice } = require('../utility/functions');
const { discordClient } = require('../client/discord');

const IS_RESET_REGEX = /^!reset$/i;

class restVoiceCommand {
  static supports(input) {
    return input.content.match(IS_RESET_REGEX) !== null;
  }

  static process(input) {
    resetVoice(discordClient);
  }
}

module.exports = restVoiceCommand;
