const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('../baseCommand');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_AH_REGEX = /^\bah\b/i;

class AhCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'ah';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Invoke Denis';
  }

  supports(message) {
    return message.content.match(IS_AH_REGEX) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/ah.png`, 'ah.png')
    const embed = new EmbedBuilder().setImage('attachment://ah.png')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const ahCommand = new AhCommand();

module.exports = ahCommand;
