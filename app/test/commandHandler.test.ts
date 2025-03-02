import dayjs from "dayjs"
import { handler } from "../commandHandler"
import { Message } from "discord.js"
import { describe, test, expect, vi } from "vitest"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

describe('command handler', () => {
  test.each([{ content: 'ah' }, { content: 'vanc' }])('Testing command ', ({ content }) => {
    const sendMock = vi.fn()
    const message = {
      author: {
        bot: false
      },
      content,
      channel: {
        send: sendMock
      } as unknown
    } as Message<true>

    handler(message)

    expect(sendMock).toHaveBeenCalled()
  })
})