import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { CommandType } from 'feely'
import dayjs from 'dayjs'

export const heureParis: CommandType = {
  data: new SlashCommandBuilder()
    .setName("paris")
    .setDescription("Wanna know what time is it in Paris?"),
  async execute(interaction: ChatInputCommandInteraction) {
    const heureDateParis = dayjs()
      .tz('Europe/Paris')
      .locale('fr')
      .format('HH:mm');
    await interaction.reply(`:flag_fr: ${heureDateParis} :french_bread:`);
  },
}
