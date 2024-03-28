const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_FUCK_YOU_COMMAND = /!fu/;

class FuckUCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!fu';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Go fuck yourself!';
  }

  supports(message) {
    return message.content.match(IS_FUCK_YOU_COMMAND) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/fucku.gif`, 'fucku.gif')
    const embed = new EmbedBuilder().setImage('attachment://fucku.gif')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const fuckUCommand = new FuckUCommand();

module.exports = fuckUCommand;
