import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const fuckU: CommandType = {
  data: new SlashCommandBuilder()
    .setName("fu")
    .setDescription("Go fuck yourself!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/fucku.gif`, { name: 'fucku.gif' });
    const embed = new EmbedBuilder().setImage('attachment://fucku.gif');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
