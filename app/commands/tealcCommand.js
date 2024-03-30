const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('./baseCommand');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_INDEED_REGEX = /indeed/i;

class TealcCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'indeed';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'My depth is immaterial to this conversation.';
  }

  supports(message) {
    return message.content.match(IS_INDEED_REGEX) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/indeed.gif`, 'indeed.gif')
    const embed = new EmbedBuilder().setImage('attachment://indeed.gif')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const tealcCommand = new TealcCommand();

module.exports = tealcCommand;
