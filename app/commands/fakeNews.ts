import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import { PATH_TO_STATIC_IMG_FOLDER } from '../utility/const'
import { CommandType } from 'feely'

export const fakeNews: CommandType = {
  data: new SlashCommandBuilder()
    .setName("fakenews")
    .setDescription("You don't want to spread false news, do you?"),
  async execute(interaction: ChatInputCommandInteraction) {
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];
    const attachment = new AttachmentBuilder(`${PATH_TO_STATIC_IMG_FOLDER}/${image}.jpg`, { name: `${image}.jpg` });
    const embed = new EmbedBuilder().setImage(`attachment://${image}.jpg`);
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
}
