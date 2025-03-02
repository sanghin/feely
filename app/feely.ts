import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";

export interface CommandType {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction) => void
}
