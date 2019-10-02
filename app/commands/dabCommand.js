const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');

const IS_DAB_REGEX = /^\bdab\b/i;

class DabCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'dab';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Celebrate your victory with a mighty dab';
  }
  supports(input) {
    return input.content.match(IS_DAB_REGEX) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/dab.gif` });
  }
}

const dabCommand = new DabCommand();

module.exports = dabCommand;
