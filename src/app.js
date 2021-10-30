const { ApolloServer, gql } = require("apollo-server")
const resolver = require("./controllers/index")
require("dotenv").config()
const schema = gql`
  type UserNif {
    documentNumber: String
    documentFullName: String
    documentState: String
    documentType: String
  }
  type Query {
    consultNIF(documentNumber: String): UserNif
  }
`
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
})

server.listen().then(({ url }) => {
  console.log(`running here: ${url}`)
})
