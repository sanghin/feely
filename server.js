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
const IS_NESTCEPAS_REGEX = /^n'?estcepas$/gi;
const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;
const IS_GET_PARIS_TIME_REGEX = /!par/;
const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?$/gi;

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

/*
 * REAL MAGIC HAPPENS
 */
client.on('message', (message) => {
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

  if (message.content.replace(/\s/g, '').match(IS_NESTCEPAS_REGEX)) {
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

client.login(DISCORD_TOKEN);
