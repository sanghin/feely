require('dotenv').config();
const Discord = require('discord.js');
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');
const moment = require('moment-timezone');

const PATH_TO_STATIC_FOLDER = `${__dirname}/../static/img/`;
const { DISCORD_TOKEN, REDIS_URL } = process.env;
const client = new Discord.Client();
const TWELVE_HOURS = 43200;

const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const IS_AH_REGEX = /^\bah\b$/i;
const IS_PROJET_REGEX = /^\bprojet\b$/i;
const IS_NESTCEPAS_REGEX = /^n'?est(\s|-)?ce\s?pas(\s\?)?$/gi;
const IS_GET_VANCOUVER_TIME_REGEX = /!vanc/;
const IS_GET_PARIS_TIME_REGEX = /!par/;
const IS_INDEED_REGEX = /indeed/;
const IS_SO_GOOD_REGEX = /so good/;
const IS_FEELS_GOOD_REGEX = /feels good/;
const IS_FAKE_NEWS_REGEX = /^fake((\s)?news)?$/gi;
const IS_FEELY_INVOKED = /^!f(eely)?$/;

/*
 * SETUP SERVER
 */
const redisClientoptions = REDIS_URL ? { url: REDIS_URL } : {};
const redisClient = redis.createClient(redisClientoptions);

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('DISCORD OK');
});

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('REDIS OK');
});

const helpMessage = new Discord.RichEmbed()
  .setAuthor('Feely')
  .setDescription('Feely can look for link double posted and will let you know. Also there are all those useful command from Feely :')
  .setTimestamp(new Date())
  .setThumbnail('https://imgur.com/a/3KOMb')
  .setColor(16777215)
  .addField('ah', 'Invoke Denis')
  .addField('projet', 'Invoke our dear Président.')
  .addField('!par and !vanc', 'Wanna know what time is it in Paris or Vancouver ?')
  .addField('fake news', "You don't want to spread false news, do you ?")
  .addField('indeed', 'My depth is immaterial to this conversation.')
  .addField('so good|feels good', 'Feels good man !')
  .addField("n'est-ce pas ?", "You need the ol' racist uncle card ? Don't move !");

function duplicatedLinkDetection(message) {
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
        }

        if (reply && message.deletable) {
            // IT'S A REPOST :SCREAM:
            // delete the message, send the repost PNG
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

function invokeDenis(message) {
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/ah.png`});
}

function invokeJML(message) {
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/nestcepas.gif`});
}

function invokeTheDonald(message) {
// will select randomly between fakenews_1.jpg and fakenews_2.jpg
    const image = ['fakenews_1', 'fakenews_2'][Math.round(Math.random())];
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/${image}.jpg`});
}

function invokeJupiter(message) {
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/projet.gif`});
}

function getVancouverTime(message) {
    const vancouverDateTime = moment()
        .tz('America/Vancouver')
        .locale('fr')
        .format('LT');
    message.channel.send(`:flag_ca: ${vancouverDateTime} :maple_leaf:`);
}

function avoirHeureParis(message) {
    const parisDateTime = moment()
        .tz('Europe/Paris')
        .locale('fr')
        .format('LT');
    message.channel.send(`:flag_fr: ${parisDateTime} :french_bread:`);
}

function getHelpCommand(message) {
    message.channel.send(helpMessage);
}

function invokeTealc(message) {
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/indeed.gif`});
}

function invokeGoodMan(message) {
    message.channel.send('', {file: `${PATH_TO_STATIC_FOLDER}/so_good.png`});
}

/*
 * REAL MAGIC HAPPENS
 */
client.on('message', (message) => {
  // do not need to react to somebody not alive, right ?
  if (message.author.bot) {
    return false;
  }

  if (message.content.match(IS_URL_REGEX)) {
    duplicatedLinkDetection(message);
  }

  if (message.content.match(IS_AH_REGEX)) {
    invokeDenis(message);
  }

  if (message.content.match(IS_NESTCEPAS_REGEX)) {
    invokeJML(message);
  }

  if (message.content.match(IS_FAKE_NEWS_REGEX)) {
    invokeTheDonald(message);
  }

  if (message.content.replace(/\s/g, '').match(IS_PROJET_REGEX)) {
    invokeJupiter(message);
  }

  if (message.content.match(IS_GET_VANCOUVER_TIME_REGEX)) {
      getVancouverTime(message);
  }

  if (message.content.match(IS_GET_PARIS_TIME_REGEX)) {
      avoirHeureParis(message);
  }

  if (message.content.match(IS_FEELY_INVOKED)) {
    getHelpCommand(message);
  }

  if (message.content.match(IS_INDEED_REGEX)) {
    invokeTealc(message);
  }
  if (message.content.match(IS_SO_GOOD_REGEX) || message.content.match(IS_FEELS_GOOD_REGEX)) {
    invokeGoodMan(message);
  }

  return true;
});

client.on('messageDelete', (message) => {
  if (!message.content.match(IS_URL_REGEX)) {
    return true;
  }

  const hashedUrl = SHA256(message.content).toString();
  redisClient.get(hashedUrl, (err, reply) => {
    if (reply) {
      redisClient.del(hashedUrl);
    }
  });
});

client.login(DISCORD_TOKEN).then(() => {
  helpMessage.setFooter('Enjoy !', client.user.avatarURL);
});
