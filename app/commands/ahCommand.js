const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_AH_REGEX = /^\bah\b$/i;

class ahCommand {
  static supports(input) {
    return input.content.match(IS_AH_REGEX) !== null;
  }

  static process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/ah.png` });
  }
}

module.exports = ahCommand;
