const IS_URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const urlCommand = {
  supports(input) {
    return input.content.match(IS_URL_REGEX) !== false;
  },
  process(input) {
    const hashedUrl = SHA256(input.content).toString();

    redisClient.get(hashedUrl, (err, reply) => {
      if (!reply) {
        // link is fresh or at least 12 hours old
        // save the hash and links meta in redis for 12 hours
        const data = {
          user: input.author.username,
          channel: input.channel.name,
          date: input.createdAt,
        };
        redisClient.set(hashedUrl, JSON.stringify(data), 'EX', TWELVE_HOURS);
      }

      if (reply && input.deletable) {
        // IT'S A REPOST :SCREAM:
        // delete the input, send the repost PNG
        // and blame the user with a custom blame input
        const data = JSON.parse(reply);
        const date = moment(new Date(data.date));
        const blameMessage = `${data.user} posted this in #${data.channel} on ${date.fromNow()}`;
        input.channel.send(blameMessage, {
          file: `${PATH_TO_STATIC_FOLDER}/no_repost.jpg`,
        });
        input.delete();
      }
    });
  },
};

module.exports = urlCommand;
