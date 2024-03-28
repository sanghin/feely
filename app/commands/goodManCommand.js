const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_SO_GOOD_REGEX = /^so good/;
const IS_FEELS_GOOD_REGEX = /^feels good/;

class GoodManCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'so good OR feels good';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Feels good man';
  }

  supports(message) {
    return message.content.match(IS_SO_GOOD_REGEX) !== null
      || message.content.match(IS_FEELS_GOOD_REGEX) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/so_good.png`, 'so_good.png')
    const embed = new EmbedBuilder().setImage('attachment://so_good.png')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const goodManCommand = new GoodManCommand();

module.exports = goodManCommand;
