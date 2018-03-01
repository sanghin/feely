class HelpMessage {
  /**
   * Constructor
   *
   * @param {String} usage
   * @param {Object} options
   * @param {String} help
   */
  constructor(usage, options, help) {
    this.usage = usage;
    this.options = options;
    this.help = help;
  }

  output() {
    let output = '\n```\n';

    output += `Usage:\n\t${this.usage}\n\n`;
    output += 'Options:\n';

    this.options.forEach((option) => { output += `\t${option.parameters.join(', ')}\t\t${option.description}\n`; });

    output += `\nHelp:\n\t${this.help}\n\n`;

    output += '```\n';
    return output;
  }
}

module.exports = HelpMessage;
