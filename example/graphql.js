const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const resolvers = mergeResolvers(fileLoader(`${__dirname}/resolvers/**/*.js`))
const typeDefs = mergeTypes(fileLoader(`${__dirname}/schema/**/*.graphql`), { all: true })

module.exports = {
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
}
