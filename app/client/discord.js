const { DISCORD_TOKEN } = require('../utility/const');
const { joinVoice, leaveVoice } = require('../utility/functions');

const Discord = require('discord.js');

const discordClient = new Discord.Client();

const helpMessage = new Discord.RichEmbed()
  .setAuthor('Feely')
  .setDescription('Feely can look for link double posted and will let you know. Also there are all those useful command from Feely :')
  .setTimestamp(new Date())
  .setThumbnail('https://imgur.com/a/3KOMb')
  .setColor(16777215)
  .addField('ah', 'Invoke Denis')
  .addField('projet', 'Invoke our dear Président.')
  .addField('!par and !vanc', 'Wanna know what time is it in Paris or Vancouver ?')
  .addField('fake news', "You don't want to spread false news, do you ?")
  .addField('indeed', 'My depth is immaterial to this conversation.')
  .addField('so good|feels good', 'Feels good man !')
  .addField("n'est-ce pas ?", "You need the ol' racist uncle card ? Don't move !");

discordClient.login(DISCORD_TOKEN).then(() => {
  helpMessage.setFooter('Enjoy !', discordClient.user.avatarURL);
});

discordClient.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('DISCORD OK');

  joinVoice(discordClient);
});

discordClient.on('', () => leaveVoice(discordClient));

module.exports = { discordClient, helpMessage };
