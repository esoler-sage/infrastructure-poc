module.exports = {
  wait: async (seconds) => new Promise(resolve => { setTimeout(resolve, seconds * 1000); }),
}