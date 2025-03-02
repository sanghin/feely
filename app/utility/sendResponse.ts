import type { Message, MessageCreateOptions, MessagePayload } from "discord.js";

export function sendResponse(message: Message<true>, response: string | MessagePayload | MessageCreateOptions) {
  if (!!process.env.DEBUG) {
    console.log(' > DEBUG > \n', response);
  }

  console.log(' > >', JSON.stringify(response, null, 2))
  message.channel.send(response);
}