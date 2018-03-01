const { DISCORD_TOKEN } = require('../utility/const');
const { joinVoice, leaveVoice } = require('../utility/functions');

const Discord = require('discord.js');

const discordClient = new Discord.Client();

discordClient.login(DISCORD_TOKEN);

discordClient.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('DISCORD OK');

  joinVoice(discordClient);
});

discordClient.on('disconnect', () => leaveVoice(discordClient));

module.exports = { discordClient };
