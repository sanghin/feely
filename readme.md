### About

This is a little bot for Discord.

## Features

- Detect links submitted more than once in the past 12 hours and replace it if posted again by an image
- Detect the usage of the famous ["ah"](https://www.youtube.com/watch?v=XE6YaLtctcI)
- Detect the usage of the famous "N'est ce pas"

### Local development setup

Install Redis (https://redis.io/)

Clone and install project dependencies:

```
$ git clone https://github.com/sanghin/feely.git
$ cd feely
$npm install
```

Setup environment variable:

```
export DISCORD_TOKEN=%discordToken%
export REDIS_URL=redis://h:localhost:3679
export PORT=8000
```

Port might change depending on what you setup for your environment.
To find out you can do `redis-cli` in your terminal to find out:
```
$ redis-cli
127.0.0.1:3679
```

Which will gives you host and port.

And then :

```
$ node server.js
```
