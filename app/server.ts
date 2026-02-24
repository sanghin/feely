// import { handler } from './commandHandler'
import { slashCommands } from './slashCommands'
import { discordClient } from './client/discord'
import { GUILD_ID } from './utility/const'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'
import type { Message } from 'discord.js'

dayjs.extend(utc)
dayjs.extend(timezone)

discordClient.on('ready', async () => {
  if (!discordClient.application || !GUILD_ID) return

  const guild = discordClient.guilds.cache.get(GUILD_ID)
  if (!guild) return

  const commandData = slashCommands.map((cmd) => cmd.data.toJSON())
  await guild.commands.set(commandData)
  console.log(`Registered ${commandData.length} slash commands to ${guild.name}`)
})

const redditRegex = /https?:\/\/(www\.)?reddit\.com\/\S+/gi
const instagramRegex = /https?:\/\/(www\.)?instagram\.com\/\S+/gi

async function betterEmbedMedium(message: Message) {
  if (message.author.bot) return

  const redditMatches = message.content.match(redditRegex) ?? []
  const instagramMatches = message.content.match(instagramRegex) ?? []

  if (redditMatches.length === 0 && instagramMatches.length === 0) return

  const fixedReddit = redditMatches.map((link) => link.replace(/reddit\.com/i, 'vxreddit.com'))
  const fixedInstagram = instagramMatches.map((link) => link.replace(/instagram\.com/i, 'vxinstagram.com'))
  const fixedLinks = [...fixedReddit, ...fixedInstagram]

  await message.reply(fixedLinks.join('\n'))
  await message.delete()
}

discordClient.on('messageCreate', (message: Message) => {
  betterEmbedMedium(message)
});

discordClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = slashCommands.find((cmd) => cmd.data.name === interaction.commandName)
  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(`Error executing /${interaction.commandName}:`, error)
    if (!interaction.replied) {
      await interaction.reply({ content: 'An error occurred.', flags: ['Ephemeral'] })
    }
  }
})

process.on('unhandledRejection', r => console.error('unhandledRejection', r));
process.on('uncaughtException', r => console.error('uncaughtException', r));
