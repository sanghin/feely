const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');

const IS_INDEED_REGEX = /indeed/;

class TealcCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'indeed';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'My depth is immaterial to this conversation.';
  }
  supports(input) {
    return input.content.match(IS_INDEED_REGEX) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/indeed.gif` });
  }
}

const tealcCommand = new TealcCommand();

module.exports = tealcCommand;
