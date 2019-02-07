const chroma = require('chroma-js')

module.exports = {
  typeDefs: `
    type Query {
      hello: String
      color2hex(color: String!): String
    }
  `,

  resolvers: {
    Query: {
      hello: () => `hello world`,
      color2hex: (obj, { color }) => chroma(color).hex()
    }
  },

  introspection: true,
  playground: true
}
