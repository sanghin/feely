const fs = require('fs');
const path = require('path');

const PATH_TO_COMMAND_FOLDER = path.join(__dirname, 'commands');
const IS_COMMAND_HELP = /.* (--help|-h)$/;
const IS_HELP = /^!help$/;

class Command {
  constructor() {
    this.commands = [];
    this.load();
  }

  addCommand(name, command) {
    this.commands.push({ name, obj: command });
  }

  handle(message) {
    const messageContent = message?.reactions?.message?.content ?? message.content

    if (messageContent.match(IS_HELP) !== null) {
      return this.sendCommandsList(message);
    }

    const availableCommands = this.commands.filter(command => command.obj.supports(message));

    if (availableCommands.length === 0) {
      return messageContent;
    }

    const match = messageContent.match(IS_COMMAND_HELP);
    if (match && match[1]) {
      return availableCommands[0].obj.getHelp(message);
    }

    return availableCommands[0].obj.process(message);
  }

  load() {
    const files = fs.readdirSync(PATH_TO_COMMAND_FOLDER);
    files.forEach((file) => {
      if (file === 'baseCommand.js') return;
      this.addCommand(file, require(path.join(PATH_TO_COMMAND_FOLDER, file)));
    });
  }

  get(name) {
    return this.commands.find(command => command.name === name).obj;
  }

  sendCommandsList(input) {
    let output = '\n```\n';

    this.commands
      .filter(command => command.obj.actionnable)
      .forEach((command) => {
        const usage = `${command.obj.usage}:`;
        output += `${usage.padEnd(25)}${command.obj.help}\n`;
      });

    output += '```\n';
    output += 'Each command has its own `--help` option to know more';
    input.channel.send(output);
  }
}

const command = new Command();
module.exports = { command };
