import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { CommandType } from "feely";
import dayjs from 'dayjs';

export const vancTime: CommandType = {
  data: new SlashCommandBuilder()
    .setName("vanc")
    .setDescription("Wanna know what time it is in Vancouver?"),
  async execute(interaction: ChatInputCommandInteraction) {
    const vancouverDateTime = dayjs()
      .tz("America/Vancouver")
      .locale("fr")
      .format("HH:mm");
    await interaction.reply(
      `:flag_ca: ${vancouverDateTime} :maple_leaf:`
    );
  },
}
