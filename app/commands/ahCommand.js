const {PATH_TO_STATIC_FOLDER} = require('../utility/const');
const IS_AH_REGEX = /^\bah\b$/i;

const ahCommand = {
  supports(input) {
    return input.content.match(IS_AH_REGEX) !== null;
  },
  process(input) {
    input.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/ah.png`});
  },
};

module.exports = ahCommand;
