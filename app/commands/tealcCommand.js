const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_INDEED_REGEX = /indeed/;

class tealcCommand {
  static supports(input) {
    return input.content.match(IS_INDEED_REGEX) !== null;
  }

  static process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/indeed.gif` });
  }
}

module.exports = tealcCommand;
