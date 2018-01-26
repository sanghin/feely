const { DISCORD_TOKEN, REDIS_URL } = process.env;
const PATH_TO_STATIC_FOLDER = `${__dirname}/../../static/img/`;
const TWELVE_HOURS = 43200;
const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

module.exports = {
  PATH_TO_STATIC_FOLDER,
  DISCORD_TOKEN,
  REDIS_URL,
  TWELVE_HOURS,
  IS_URL_REGEX,
};
