const fs = require('fs');
const path = require('path');

const Commands = {
  commands: [],
  addCommand: function (command) {
    Commands.commands.push(command);
  },
  handle: function (input) {
    const availableCommands = this.commands
      .filter(function (command) {
        return command.supports(input);
      });

    return availableCommands[0].process();
  },
  load: function (dir) {
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
      Commands.addCommand(require(path.join(dir, file)));

    });
  }
};

module.exports = Commands;
