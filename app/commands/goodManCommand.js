const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_SO_GOOD_REGEX = /^so good/;
const IS_FEELS_GOOD_REGEX = /^feels good/;

class GoodManCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'so good OR feels good';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Feels good man';
  }

  supports(input) {
    return input.content.match(IS_SO_GOOD_REGEX) !== null
      || input.content.match(IS_FEELS_GOOD_REGEX) !== null;
  }

  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/so_good.png` });
  }
}

const goodManCommand = new GoodManCommand();

module.exports = goodManCommand;
