import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const goodMan: CommandType = {
  data: new SlashCommandBuilder()
    .setName("feelsgood")
    .setDescription("Feels good man"),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/so_good.png`, { name: 'so_good.png' });
    const embed = new EmbedBuilder().setImage('attachment://so_good.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
