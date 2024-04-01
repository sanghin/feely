const dayjs = require('dayjs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('paris')
        .setDescription('Wanna know what time is it in Paris ?'),
    async execute(interaction) {
        const now = dayjs().tz('Europe/Paris').locale('fr').format('HH:mm');
        await interaction.reply(`:flag_fr: ${now} :french_bread:`);
    },
};
