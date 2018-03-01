const moment = require('moment-timezone');
const BaseCommand = require('../baseCommand');

const EST_CE_HEURE_PARIS_REGEX = /!par/;

class CommandeHeureParis extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!par';
    this.options = [{ parameters: ['-h', '--help'], description: 'display this help message' }];
    this.help = 'Wanna know what time is it in Paris ?';
  }

  supports(input) {
    return input.content.match(EST_CE_HEURE_PARIS_REGEX) !== null;
  }
  process(input) {
    const heureDateParis = moment()
      .tz('Europe/Paris')
      .locale('fr')
      .format('LT');
    input.channel.send(`:flag_fr: ${heureDateParis} :french_bread:`);
  }
}

const commandeHeureParis = new CommandeHeureParis();

module.exports = commandeHeureParis;
