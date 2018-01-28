const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_PROJET_REGEX = /^\bprojet\b$/i;

class projetCommand {
  static supports(input) {
    return input.content.match(IS_PROJET_REGEX) !== null;
  }

  static process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/projet.gif` });
  }
}

module.exports = projetCommand;
