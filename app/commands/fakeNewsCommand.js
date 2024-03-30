const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('./baseCommand');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?/gi;

class FakeNewsCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'fake news';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'You don\'t want to spread false news, do you?';
  }

  supports(message) {
    return message.content.match(IS_FAKE_NEWS_REGEX) !== null;
  }

  process(message) {
    // will select randomly between fakenews_1.jpg and fakenews_2.jpg
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];

    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/${image}.jpg`, `${image}.jpg`)
    const embed = new EmbedBuilder().setImage(`attachment://${image}.jpg`)

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const fakeNewsCommand = new FakeNewsCommand();

module.exports = fakeNewsCommand;
