const { REST, Routes } = require('discord.js');
const { DISCORD_TOKEN, CLIENT_ID } = require('../utility/const');
const { slashCommands } = require('../slash-commands');
const commands = [];


console.log('Deploying commands...');

// We need to convert commands to an array of json objects
for (const command of slashCommands) {
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        console.log(commands);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
