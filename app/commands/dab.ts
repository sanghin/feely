import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const dab: CommandType = {
  data: new SlashCommandBuilder()
    .setName("dab")
    .setDescription("Celebrate your victory with a mighty dab"),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/dab.gif`, { name: 'dab.gif' });
    const embed = new EmbedBuilder().setImage('attachment://dab.gif');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
