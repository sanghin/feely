import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from "feely";

export const AH: CommandType = {
  data: new SlashCommandBuilder()
    .setName("ah")
    .setDescription("Invoke Denis"),
  async execute(interaction: ChatInputCommandInteraction) {
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/ah.png`, { name: 'ah.png' });
    const embed = new EmbedBuilder().setImage('attachment://ah.png');
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
