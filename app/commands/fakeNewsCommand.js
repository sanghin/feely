const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');

const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?/gi;

class FakeNewsCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'fake news';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'You don\'t want to spread false news, do you?';
  }
  supports(input) {
    return input.content.match(IS_FAKE_NEWS_REGEX) !== null;
  }

  process(input) {
    // will select randomly between fakenews_1.jpg and fakenews_2.jpg
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];
    input.channel.send('', { file: `${PATH_TO_STATIC_IMG_FOLDER}/${image}.jpg` });
  }
}

const fakeNewsCommand = new FakeNewsCommand();

module.exports = fakeNewsCommand;
