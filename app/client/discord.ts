import { GatewayIntentBits, Client } from 'discord.js';
import { DISCORD_TOKEN } from '../utility/const'

const discordClient = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

discordClient.login(DISCORD_TOKEN);

discordClient.on('ready', () => {
  console.log('DISCORD OK');
});

export { discordClient };
