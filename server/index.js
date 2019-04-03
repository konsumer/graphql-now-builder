const express = require('express')
const { ApolloServer } = require('apollo-server-express')

// this is the entrypoint code
const config = require('./_entrypoint')

const app = express()

// load a sub-app for greater control
const childApp = express()
const path = (config && config.path) || '/graphql'
const server = new ApolloServer(config)
server.applyMiddleware({ app: childApp, path })

app.use(path, childApp)

module.exports = app 
