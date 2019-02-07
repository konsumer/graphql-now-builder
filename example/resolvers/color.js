const chroma = require('chroma-js')

module.exports = {
  Query: {
    color2hex: (obj, { color }) => chroma(color).hex()
  }
}
