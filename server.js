const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const redis = require('redis');
const express = require('express');
const app = express();

const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

let redisClientoptions = {};
if (process.env.REDIS_URL) {
    redisClientoptions = { url: process.env.REDIS_URL };
}

const redisClient = redis.createClient(redisClientoptions);

app.set('port', (process.env.PORT || 7000));
app.use(express.static(__dirname + '/static'));
app.get('/', (request, response) => {
    response.sendFile(Path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 */
const hashURL = (str, asString, seed) => {
    let i, l, hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if (asString) {
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
};

client.on('ready', () => {
    console.log('DISCORD OK');
});

redisClient.on('connect', () => {
    console.log('REDIS OK');
});

client.on('message', message => {
    if (message.content.match(IS_URL_REGEX)) {
        const hashedUrl = hashURL(message.content, true).toString();

        redisClient.get(hashedUrl, (err, reply) => {
            if (reply) {
                redisClient.set(hashedUrl, 'OC', 'EX', 43200);
            } else if (message.deletable) {
                message.channel.send('NEIN! NEIN! NEIN! NO REPOST HERE!');
                message.delete();
            }
        });
    }
});

client.login(token);
