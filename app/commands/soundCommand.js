const fs = require('fs');
const path = require('path');

const { PATH_TO_STATIC_SOUNDS_FOLDER } = require('../utility/const');
const { discordClient } = require('../client/discord');

const PLAY_FILE_REGEX = /^!play (\w+)/;
const IS_PLAY_REGEX = /^!play/;

class SoundCommand {
  constructor() {
    this.sounds = [];
    this.loadSounds();
  }

  supports(input, context) {
    return input.content.match(IS_PLAY_REGEX) !== null && context === 'post';
  }

  /**
   * Play an audio resource.
   * @param {Message} input Message input.
   */
  process(input) {
    const match = PLAY_FILE_REGEX.exec(input.content);

    if (!match || match.length < 2) {
      input.channel.send('Specify sound');
      return;
    }

    const soundPlay = this.sounds.find(sound => sound.soundName === match[1]);

    if (!soundPlay) {
      input.channel.send('Sound not found');
      return;
    }

    discordClient
      .voiceConnections
      .forEach((connection) => {
        const dispatcher = connection.playFile(`${PATH_TO_STATIC_SOUNDS_FOLDER}/${soundPlay.fileName}`);
        dispatcher.once('end', () => {
          input.delete();
        });
      });
  }

  addSound(soundName, fileName) {
    this.sounds.push({ soundName, fileName });
  }

  loadSounds() {
    const files = fs.readdirSync(PATH_TO_STATIC_SOUNDS_FOLDER);
    files.forEach((file) => {
      const fileName = path.basename(file, path.extname(file));
      this.addSound(fileName, file);
    });
  }
}

const soundCommand = new SoundCommand();

module.exports = soundCommand;
