const { PATH_TO_STATIC_FOLDER } = require('../utility/const');

const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?$/gi;

const fakeNewsCommand = {
  supports(input) {
    return input.content.match(IS_FAKE_NEWS_REGEX) !== null;
  },
  process(input) {
    // will select randomly between fakenews_1.jpg and fakenews_2.jpg
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];
    input.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/${image}.jpg` });
  },
};

module.exports = fakeNewsCommand;
