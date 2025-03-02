import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const projet: CommandType = {
  data: new SlashCommandBuilder()
    .setName("projet")
    .setDescription("Invoke our dear Président."),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/projet.gif`, { name: 'projet.gif' });
    const embed = new EmbedBuilder().setImage('attachment://projet.gif');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
