export function formathelpMessage(usage: string, options: Array<{ parameters: string[]; description: string }>, help: string) {
  let output = '\n```\n';

  output += `Usage:\n\t${usage}\n\n`;
  output += 'Options:\n';

  options.forEach((option) => { output += `\t${option.parameters.join(', ')}\t\t${option.description}\n`; });

  output += `\nHelp:\n\t${help}\n\n`;

  output += '```\n';

  return output;
}
