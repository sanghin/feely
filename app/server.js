require('dotenv').config();

const { command } = require('./commands');
const { discordClient } = require('./client/discord');
const dayjs = require('dayjs')

const timezone = require('dayjs/plugin/timezone') 

dayjs.extend(timezone)

discordClient.on('message', (message) => {
  // do not need to react to somebody not alive, right ?
  if (message.author.bot) {
    return;
  }

  command.handle(message, 'post');
});

discordClient.on('messageDelete', (message) => {
  command.handle(message, 'delete');
});

process.on('unhandledRejection', r => console.error(r));
