const {PATH_TO_STATIC_FOLDER} = require('../utility/const');
const IS_SO_GOOD_REGEX = /^so good$/;
const IS_FEELS_GOOD_REGEX = /^feels good$/;

const goodManCommand = {
  supports(input) {
    return input.content.match(IS_SO_GOOD_REGEX) !== null
      || input.content.match(IS_FEELS_GOOD_REGEX) !== null;
  },
  process(input) {
    input.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/so_good.png`});
  },
};

module.exports = goodManCommand;
