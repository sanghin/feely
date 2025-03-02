export function supports(regex: RegExp, message: string): boolean {
  return message.match(regex) !== null;
}