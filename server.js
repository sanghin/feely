require('dotenv').config();
const Discord = require('discord.js');
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');
const moment = require('moment-timezone');

const PATH_TO_STATIC_FOLDER = `${__dirname}/static/img/`;
const { DISCORD_TOKEN, REDIS_URL } = process.env;
const client = new Discord.Client();
const TWELVE_HOURS = 43200;

const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
const IS_AH_REGEX = /^\bah\b$/i;
const IS_PROJET_REGEX = /^\bprojet\b$/i;
const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas\s\??$/gi;
const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;
const IS_GET_PARIS_TIME_REGEX = /!par/;
const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?$/gi;
const IS_FEELY_INVOKED = /^!feely$/;

/*
 * SETUP SERVER
 */
const redisClientoptions = REDIS_URL ? { url: REDIS_URL } : {};
const redisClient = redis.createClient(redisClientoptions);

client.on('ready', () => {
  console.log('DISCORD OK');
});

redisClient.on('connect', () => {
  console.log('REDIS OK');
});

const helpMessage = new Discord.RichEmbed({
  description: 'Feely can look for link double posted and will let you know. Also there are all those useful command from Feely :',
  timestamp: new Date(),
  color: 16777215,
  thumbnail: { file: `${PATH_TO_STATIC_FOLDER}/oh_hai.gif` },
  fields: [
    {
      name: 'ah',
      value: 'Invoke Denis',
    },
    {
      name: 'projet',
      value: 'Invoke our dear Président.',
    },
    {
      name: '!par and !vanc',
      value: 'Wanna know what time is it in Paris or Vancouver ?',
    },
    {
      name: 'fake news',
      value: 'You don\'t want to spread false news, do you ?',
    },
    {
      name: 'n\'est-ce pas ?',
      value: 'You need the ol\' racist uncle card ? Don\'t move !',
    },
  ],
});

/*
 * REAL MAGIC HAPPENS
 */
client.on('message', (message) => {
  // do not need to react to somebody not alive, right ?
  if (message.author.bot) {
    return false;
  }

  if (message.content.match(IS_URL_REGEX)) {
    const hashedUrl = SHA256(message.content).toString();

    redisClient.get(hashedUrl, (err, reply) => {
      if (!reply) {
        // link is fresh or at least 12 hours old
        // save the hash and links meta in redis for 12 hours
        const data = {
          user: message.author.username,
          channel: message.channel.name,
          date: message.createdAt,
        };
        redisClient.set(hashedUrl, JSON.stringify(data), 'EX', TWELVE_HOURS);
      } else if (message.deletable) {
        // IT'S A REPOST :SCREAM:
        // delete the message, post the repost PNG
        // and blame the user with a custom blame message
        const data = JSON.parse(reply);
        const date = moment(new Date(data.date));
        const blameMessage = `${data.user} posted this in #${data.channel} on ${date.fromNow()}`;
        message.channel.send(blameMessage, {
          file: `${PATH_TO_STATIC_FOLDER}/no_repost.jpg`,
        });
        message.delete();
      }
    });
  }

  if (message.content.match(IS_AH_REGEX)) {
    message.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/ah.png` });
  }

  if (message.content.match(IS_NESTCEPAS_REGEX)) {
    message.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/nestcepas.gif` });
  }

  if (message.content.match(IS_FAKE_NEWS_REGEX)) {
    // will select randomly between fakenews_1.jpg and fakenews_2.jpg
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];
    message.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/${image}.jpg` });
  }

  if (message.content.replace(/\s/g, '').match(IS_PROJET_REGEX)) {
    message.channel.send('', { file: `${PATH_TO_STATIC_FOLDER}/projet.gif` });
  }

  if (message.content.match(IS_GET_VANCOUVER_TIME_REGEX)) {
    const vancouverDateTime = moment()
      .tz('America/Vancouver')
      .locale('fr')
      .format('LT');
    message.channel.send(`:flag_ca: ${vancouverDateTime} :maple_leaf:`);
  }

  if (message.content.match(IS_GET_PARIS_TIME_REGEX)) {
    const parisDateTime = moment()
      .tz('Europe/Paris')
      .locale('fr')
      .format('LT');
    message.channel.send(`:flag_fr: ${parisDateTime} :french_bread:`);
  }

  if (message.content.match(IS_FEELY_INVOKED)) {
    message.channel.send(helpMessage);
  }

  return true;
});

client.on('messageDelete', (message) => {
  if (message.content.match(IS_URL_REGEX)) {
    const hashedUrl = SHA256(message.content).toString();
    redisClient.get(hashedUrl, (err, reply) => {
      if (reply) {
        redisClient.del(hashedUrl);
      }
    });
  }
});

client.login(DISCORD_TOKEN).then((data) => {
  helpMessage.setFooter('Enjoy !', client.user.avatarURL);
});
