# graphql-now-builder

This lets you quickly build a graphql server on now.sh, from a simple config file.

## configuration

Put something like this in your `now.json`:

```json
{
  "version": 2,
  "builds": [
    { "src": "./graphql.js", "use": "graphql-now-builder" },
  ],
  "routes": [
    { "src": "/graphql", "dest": "./graphql.js" }
  ]
}
```

All of your files will be built with ncc in to a single service. Your dependencies are tracked normally in a `package.json` that is at the same level as your `src` config file.

The builder will open `graphql.js` and build a service for you, as a lambda.

Make your `graphql.js` look something like this:

```js
module.exports = {
  // globs, relative to config file
  schemaDirectives: './schemaDirectives.js', // optional
  typeDefs: './schema/**/*.graphql',         // merged
  resolvers: './resolvers/**/*.js',          // optional, merged, misisng will be mocked
  
  // apollo-server options here
  introspection: true,
  playground: { settings: { 'request.credentials': 'same-origin' } }
}
```

### context

You can also feed your resolvers & directives a custom `context` file, which exports a function:

```js
module.exports = {
  typeDefs: './schema/**/*.graphql',         // merged
  context: './context.js'
}
```

where `context.js` looks like this:

```js
module.exports = ctx => ({ ...ctx, mything: true })
```

This will allow you to check headers (from `ctx.req`) or insert things like database-libraries or whatever.
