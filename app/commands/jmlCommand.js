const BaseCommand = require('../baseCommand');
const { PATH_TO_STATIC_IMG_FOLDER } = require('../utility/const');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas(\s\?)?/gi;
const IS_NESTCEPAS_REGEX_JML = /^jml/gi;

class JmlCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = 'n\'est-ce pas OU jml';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'You need the ol\' racist uncle card? Don\'t move!';
  }

  supports(message) {
    return message.content.match(IS_NESTCEPAS_REGEX) !== null || message.content.match(IS_NESTCEPAS_REGEX_JML) !== null;
  }

  process(message) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/nestcepas.gif`, 'nestcepas.gif')
    const embed = new EmbedBuilder().setImage('attachment://nestcepas.gif')

    message.channel.send({ embeds: [embed], files: [attachment] });
  }
}

const jmlCommand = new JmlCommand();

module.exports = jmlCommand;
