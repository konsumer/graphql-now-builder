const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const resolvers = mergeResolvers(fileLoader(`./resolvers/**/*.js`))
const typeDefs = mergeTypes(fileLoader(`./schema/**/*.graphql`), { all: true })

module.exports = {
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
}
