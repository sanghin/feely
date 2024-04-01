const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const BaseCommand = require('./baseCommand');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_PROJET_REGEX = /^\bprojet\b/i;

class ProjetCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'projet';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Invoke our dear Président.';
  }

  supports(message) {
    return message.content.match(IS_PROJET_REGEX) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/projet.gif`, 'projet.gif')
    const embed = new EmbedBuilder().setImage('attachment://projet.gif')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const projetCommand = new ProjetCommand();

module.exports = projetCommand;
