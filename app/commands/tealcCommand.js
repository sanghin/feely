const { PATH_TO_STATIC_FOLDER } = require('../utility/const');

const IS_INDEED_REGEX = /indeed/;

const tealcCommand = {
  supports(input) {
    return input.content.match(IS_INDEED_REGEX) !== null;
  },
  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/indeed.gif` });
  },
};

module.exports = tealcCommand;
