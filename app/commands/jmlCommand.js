const { PATH_TO_STATIC_FOLDER } = require('../utility/const');

const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas(\s\?)?$/gi;

const jmlCommand = {
  supports(input) {
    return input.content.match(IS_NESTCEPAS_REGEX) !== null;
  },
  process(input) {
    input.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/nestcepas.gif` });
  },
};

module.exports = jmlCommand;
