const moment = require('moment-timezone');
const BaseCommand = require('../baseCommand');

const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;

class VancTimeCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!vanc';
    this.options = [{ parameters: ['-h', '--help'], description: 'Display this help message' }];
    this.help = 'Wanna know what time it is in Vancouver?';
  }
  supports(input) {
    return input.content.match(IS_GET_VANCOUVER_TIME_REGEX) !== null;
  }

  process(input) {
    const vancouverDateTime = moment()
      .tz('America/Vancouver')
      .locale('fr')
      .format('LT');
    input.channel.send(`:flag_ca: ${vancouverDateTime} :maple_leaf:`);
  }
}

const vancTimeCommand = new VancTimeCommand();

module.exports = vancTimeCommand;
