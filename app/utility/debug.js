module.exports = {
  debug: function debug(message, context = {}) {
    if (!process.env.DEBUG) return
  
    console.log(message, JSON.stringify(context, null, 4))
  }
} 