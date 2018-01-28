const Discord = require('discord.js');

const getDefaultVoiceChannel = discordClient => discordClient
  .channels
  .filter(channel => channel instanceof Discord.VoiceChannel && channel.position === 0)
  .first();

const leaveVoice = (discordClient) => {
  const defaultAudioChannel = getDefaultVoiceChannel(discordClient);

  defaultAudioChannel.leave();
};

const joinVoice = (discordClient) => {
  const defaultAudioChannel = getDefaultVoiceChannel(discordClient);

  defaultAudioChannel.join()
    .then((voiceConnection) => { // Connection is an instance of VoiceConnection
    // eslint-disable-next-line no-console
      console.log(`Successful join of ${voiceConnection.channel}`);
    })
    .catch(console.log);
};

const resetVoice = (discordClient) => {
  leaveVoice(discordClient);
  setTimeout(() => joinVoice(discordClient), 1000);
};

module.exports = { joinVoice, resetVoice, leaveVoice };
