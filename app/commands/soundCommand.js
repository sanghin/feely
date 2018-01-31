const fs = require('fs');
const path = require('path');
const BaseCommand = require('../baseCommand');

const { PATH_TO_STATIC_SOUNDS_FOLDER } = require('../utility/const');
const { discordClient } = require('../client/discord');

const PLAY_FILE_REGEX = /^!play (\w+)/;
const PLAY_LIST_REGEX = /^!play --list/;
const IS_PLAY_REGEX = /^!play/;

class SoundCommand extends BaseCommand {
  constructor() {
    super();
    this.actionnable = true;
    this.usage = '!play <sound>';
    this.options = [
      { parameters: ['-h', '--help'], description: 'Display this help message' },
      { parameters: ['-l', '--list'], description: 'List all sounds available' },
    ];
    this.help = 'Play sounds in voice channel';
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
    if (PLAY_LIST_REGEX.exec(input.content)) {
      this.showList(input);
      return;
    }

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

  /**
   * Show list of sounds available
   *
   * @param {Message} input
   */
  showList(input) {
    let list = '```';
    this.sounds.forEach((sound) => { list += `${sound.soundName}\n`; });
    list += '```';
    input.channel.send(list);
  }
}

const soundCommand = new SoundCommand();

module.exports = soundCommand;
