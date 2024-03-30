const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('./baseCommand');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_DAB_REGEX = /^\bdab\b/i;

class DabCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'dab';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Celebrate your victory with a mighty dab';
  }

  supports(message) {
    return message.content.match(IS_DAB_REGEX) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/dab.gif`, 'dab.gif')
    const embed = new EmbedBuilder().setImage('attachment://dab.gif')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const dabCommand = new DabCommand();

module.exports = dabCommand;
