require('dotenv').config();

const { command } = require('./commands');
const { discordClient } = require('./client/discord');
const { leaveVoice } = require('./utility/functions');

/*
 * REAL MAGIC HAPPENS
 */
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


process.on('SIGTERM', () => leaveVoice(discordClient));
