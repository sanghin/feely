require('dotenv').config();

const Discord = require('discord.js');
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');
const moment = require('moment-timezone');

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const TWELVE_HOURS = 43200;

const IS_URL_REGEX = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
const IS_AH_REGEX = /^\bah\b$/i;
const IS_NESTCEPAS_REGEX = /^n'?estcepas$/gi;
const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;
const IS_GET_PARIS_TIME_REGEX = /!par/;

/*
 * SETUP SERVER
 */
let redisClientoptions = {};
if (process.env.REDIS_URL) {
  redisClientoptions = { url: process.env.REDIS_URL };
}

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
        const blameMessage =
          `${data.user} posted this in #${data.channel} on ${date.fromNow()}` || '';
        message.channel.send(blameMessage, {
          file: `${__dirname}/static/img/no_repost.jpg`,
        });
        message.delete();
      }
    });
  }

  if (message.content.match(IS_AH_REGEX)) {
    message.channel.send('', { file: `${__dirname}/static/img/ah.png` });
  }

  if (message.content.replace(/\s/g, '').match(IS_NESTCEPAS_REGEX)) {
    message.channel.send('', { file: `${__dirname}/static/img/nestcepas.gif` });
  }

  if (message.content.match(IS_GET_VANCOUVER_TIME_REGEX)) {
    const vancouverDateTime = moment()
      .tz('America/Vancouver')
      .locale('fr')
      .format('LTS');
    message.channel.send(`${vancouverDateTime}`);
  }

  if (message.content.match(IS_GET_PARIS_TIME_REGEX)) {
    const parisDateTime = moment()
      .tz('Europe/Paris')
      .locale('fr')
      .format('LTS');
    message.channel.send(`${parisDateTime}`);
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

client.login(token);
