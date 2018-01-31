const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas(\s\?)?/gi;

class JmlCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'n\'est-ce pas';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'You need the ol\' racist uncle card? Don\'t move!';
  }
  supports(input) {
    return input.content.match(IS_NESTCEPAS_REGEX) !== null;
  }
  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/nestcepas.gif` });
  }
}

const jmlCommand = new JmlCommand();

module.exports = jmlCommand;
