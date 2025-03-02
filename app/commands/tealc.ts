import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const tealc: CommandType = {
  data: new SlashCommandBuilder()
    .setName("indeed")
    .setDescription("My depth is immaterial to this conversation."),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/indeed.gif`, { name: 'indeed.gif' });
    const embed = new EmbedBuilder().setImage('attachment://indeed.gif');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
