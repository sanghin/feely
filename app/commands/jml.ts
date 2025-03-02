import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const jml: CommandType = {
  data: new SlashCommandBuilder()
    .setName("jml")
    .setDescription("You need the ol' racist uncle card? Don't move!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/nestcepas.gif`, { name: 'nestcepas.gif' });
    const embed = new EmbedBuilder().setImage('attachment://nestcepas.gif');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
