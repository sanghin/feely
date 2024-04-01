const HelpMessage = require('../utility/helpMessage');

class BaseCommand {
  constructor() {
    this.actionnable = false;
  }

  getHelp(input) {
    const helpMessage = new HelpMessage(this.usage, this.options, this.help);

    input.channel.send(helpMessage.output());
  }


  supports(message) {
    return false;
  }
}

module.exports = BaseCommand;
