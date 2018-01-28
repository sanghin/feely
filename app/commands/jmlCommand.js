const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');

const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas(\s\?)?$/gi;

class jmlCommand {
  static supports(input) {
    return input.content.match(IS_NESTCEPAS_REGEX) !== null;
  }
  static process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/nestcepas.gif` });
  }
}

module.exports = jmlCommand;
