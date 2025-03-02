export function debug(message: unknown, context: object = {}) {
    if (!process.env.DEBUG) return
  
    console.log(message, JSON.stringify(context, null, 4))
  }
