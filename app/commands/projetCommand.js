const { PATH_TO_STATIC_FOLDER } = require('../utility/const');

const IS_PROJET_REGEX = /^\bprojet\b$/i;

const projetCommand = {
  supports(input) {
    return input.content.match(IS_PROJET_REGEX) !== null;
  },
  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/projet.gif` });
  },
};

module.exports = projetCommand;
