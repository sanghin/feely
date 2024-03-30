const { GatewayIntentBits, Client, Collection, Events } = require('discord.js');
const { DISCORD_TOKEN } = require('../utility/const');
const { slashCommands } = require('../slash-commands');

const discordClient = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

discordClient.login(DISCORD_TOKEN);
discordClient.commands = new Collection();

// For each commands we need to add it to the discordClient.commands collection
for (const command of slashCommands) {
  discordClient.commands.set(command.data.name, command);
}

discordClient.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

discordClient.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

module.exports = { discordClient };
