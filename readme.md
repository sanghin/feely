### About

This is a little bot for Discord.

## Features

- Detect links submitted more than once in the past 12 hours and replace it if posted again by an image
- Detect the usage of the famous ["ah"](https://www.youtube.com/watch?v=XE6YaLtctcI)
- Detect the usage of the famous "N'est ce pas"
- And many more

### Local development setup

```
git clone https://github.com/sanghin/feely.git
```
```
cd feely && pnpm install
```

Setup environment variable in a `.env` file:
```
DISCORD_TOKEN=
APPLICATION_ID=
```

Start with the dev command
```
pnpm run dev
```
