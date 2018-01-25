const fs = require('fs');
const path = require('path');

const PATH_TO_COMMAND_FOLDER = `${__dirname}/commands`;

class Command {
  constructor() {
    this.commands = [];
    this.load();
  }

  addCommand(command) {
    this.commands.push(command);
  }

  handle(input) {
    const availableCommands = this.commands.filter(command => command.supports(input));

    return availableCommands[0].process();
  }

  load() {
    const files = fs.readdirSync(PATH_TO_COMMAND_FOLDER);
    files.forEach((file) => {
      this.addCommand(require(path.join(PATH_TO_COMMAND_FOLDER, file)));
    });
  }
}

const command = new Command();
module.exports = { command };
