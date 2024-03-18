const Discord = require('discord.js');
const { DISCORD_TOKEN } = require('../utility/const');


const discordClient = new Discord.Client();

discordClient.login(DISCORD_TOKEN);

discordClient.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('DISCORD OK');
});

module.exports = { discordClient };
