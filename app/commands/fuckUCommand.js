const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_FUCK_YOU_COMMAND = /!fu/;

class FuckUCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!fu';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Go fuck yourself!';
  }

  supports(input) {
    return input.content.match(IS_FUCK_YOU_COMMAND) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/fucku.gif` });
  }
}

const fuckUCommand = new FuckUCommand();

module.exports = fuckUCommand;
