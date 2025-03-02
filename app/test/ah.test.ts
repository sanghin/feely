import { AH } from "../commands/ah"
import { Message } from "discord.js"
import { describe, test, expect, vi } from "vitest"

describe('AH', () => {
  test('properties', () => {
    expect(AH.actionnable).toBe(true)
    expect(AH.usage).toBe('ah')
    expect(AH.help).toBe('Invoke Denis')
    expect(AH.options).toEqual([{ parameters: ['-h', '--help'], description: 'Display this help message' }])
  })

  test('supports', () => {
    const sendMock = vi.fn()
    const message = {
      content: 'ah',
      channel: {
        send: sendMock
      } as unknown
    } as Message<true>

    expect(AH.supports(message)).toBe(true)
  })

  test('getHelp', () => {
    const sendMock = vi.fn()
    const message = {
      author: {
        bot: false
      },
      content: 'ah',
      channel: {
        send: sendMock
      } as unknown
    } as Message<true>

    AH.getHelp(message)

    const expected = String("\n```\nUsage:\n\tah\n\nOptions:\n\t-h, --help\t\tDisplay this help message\n\nHelp:\n\tInvoke Denis\n\n```\n")
    expect(sendMock).toBeCalledWith(expected)
  })

  test('process', () => {
    const sendMock = vi.fn()
    const message = {
      author: {
        bot: false
      },
      content: 'ah',
      channel: {
        send: sendMock
      } as unknown
    } as Message<true>

    AH.process(message)

    expect(AH.supports(message)).toBe(true)

    expect(sendMock).toBeCalled()
  })
})
