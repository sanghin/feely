const fs = require('fs');
const path = require('path');

const PATH_TO_COMMAND_FOLDER = `${__dirname}/commands`;

class Command {
  constructor() {
    this.commands = [];
    this.load();
  }

  addCommand(name, command) {
    this.commands.push({name: name, obj: command});
  }

  handle(input, context) {
    const availableCommands = this.commands.filter(command => command.obj.supports(input, context));

    if (availableCommands.length === 0) {
      return;
    }

    return availableCommands[0].obj.process(input);
  }

  load() {
    const files = fs.readdirSync(PATH_TO_COMMAND_FOLDER);
    files.forEach((file) => {
      this.addCommand(file, require(path.join(PATH_TO_COMMAND_FOLDER, file)));
    });
  }

  get(name) {
    return this.commands.find(command => command.name === name).obj;
  }
}

const command = new Command();
module.exports = {command};
