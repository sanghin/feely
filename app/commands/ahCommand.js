const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');

const IS_AH_REGEX = /^\bah\b/i;

class AhCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'ah';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Invoke Denis';
  }

  supports(input) {
    return input.content.match(IS_AH_REGEX) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/ah.png` });
  }
}

const ahCommand = new AhCommand();

module.exports = ahCommand;
