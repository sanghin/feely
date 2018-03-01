const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');

const IS_PROJET_REGEX = /^\bprojet\b/i;

class ProjetCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'projet';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Invoke our dear Président.';
  }
  supports(input) {
    return input.content.match(IS_PROJET_REGEX) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/projet.gif` });
  }
}

const projetCommand = new ProjetCommand();

module.exports = projetCommand;
