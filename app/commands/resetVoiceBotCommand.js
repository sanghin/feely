const { resetVoice } = require('../utility/functions');
const { discordClient } = require('../client/discord');
const BaseCommand = require('../baseCommand');

const IS_RESET_REGEX = /^!reset/i;

class ResetVoiceCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!reset';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Reset Feely voice.';
  }
  supports(input) {
    return input.content.match(IS_RESET_REGEX) !== null;
  }

  process(input) {
    resetVoice(discordClient);
  }
}

const resetVoiceCommand = new ResetVoiceCommand();

module.exports = resetVoiceCommand;
