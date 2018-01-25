const moment = require('moment-timezone');
const EST_CE_HEURE_PARIS_REGEX = /!par/;

const commandeHeureParis = {
  supports(input) {
    return input.content.match(EST_CE_HEURE_PARIS_REGEX) !== null;
  },
  process(input) {
    const heureDateParis = moment()
      .tz('Europe/Paris')
      .locale('fr')
      .format('LT');
    input.channel.send(`:flag_fr: ${heureDateParis} :french_bread:`);
  },
};

module.exports = commandeHeureParis;
