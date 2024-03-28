const { GatewayIntentBits, Client } = require('discord.js');
const { DISCORD_TOKEN } = require('../utility/const');

const discordClient = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

discordClient.login(DISCORD_TOKEN);

discordClient.on('ready', () => {
  console.log('DISCORD OK');
});

module.exports = { discordClient };
