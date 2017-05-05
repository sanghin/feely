const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');
const moment = require('moment');
const express = require('express');

const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
const IS_AH_REGEX = /^ah/i;
const IS_NESTCEPAS_REGEX = /^n'?estcepas$/ig;


const app = express();
const port = process.env.port || 7000;

/*
 * SETUP SERVER
 */

// Heroku will kill all process if no node server are up and running after 60 secs
app.set('port', port);

app.get('/', () => {
    response.send('Feely up and running.')
}).listen(app.get('port'), () => {
    console.log('Node app up and running on '+app.get('port'))
});

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

client.on('message', message => {
    if (message.content.match(IS_URL_REGEX)) {
        const hashedUrl = SHA256(message.content).toString();

        redisClient.get(hashedUrl, (err, reply) => {
            if (!reply) {
                let data = {
                    'user': message.author.username,
                    'channel': message.channel.name,
                    'date': message.createdAt
                };
                redisClient.set(hashedUrl, JSON.stringify(data), 'EX', 43200);
            } else if (message.deletable) {
                let data = JSON.parse(reply);
                let date = moment(new Date(data.date));
                let additionalMessage = data.user + ' posted this in #' + data.channel + ' on ' + date.fromNow() || '';
                message.channel.send(additionalMessage, {file: __dirname+'/static/img/no_repost.jpg'});
                message.delete();
            }
        });
    }

    if (message.content.match(IS_AH_REGEX)) {
        message.channel.send('', {file: __dirname+'/static/img/ah.png'});
    }

    if (message.content.replace(/\s/g,'').match(IS_NESTCEPAS_REGEX)) {
        message.channel.send('', {file: __dirname+'/static/img/nestcepas.gif'});
    }
});

client.on('messageDelete', message => {
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
