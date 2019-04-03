const express = require('express')
const { ApolloServer } = require('apollo-server-express')

// this is the entrypoint code
const config = require('./_entrypoint')

const path = (config && config.path) || '/graphql'

const app = express()

// load a sub-app for greater control
const server = new ApolloServer(config)
server.applyMiddleware({ app, path })

module.exports = app 
