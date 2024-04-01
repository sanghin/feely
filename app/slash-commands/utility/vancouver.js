const dayjs = require('dayjs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vancouver')
        .setDescription('Wanna know what time it is in Vancouver?'),
    async execute(interaction) {
        const now = dayjs().tz('America/Vancouver').locale('fr').format('HH:mm');
        await interaction.reply(`:flag_ca: ${now} :maple_leaf:`);
    },
};
