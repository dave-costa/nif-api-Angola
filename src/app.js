const { ApolloServer, gql } = require("apollo-server")
const resolver = require("./controllers/index")
require("dotenv").config()
const schema = gql`
  """
  UserNif is a type that
  indicates the return type
  of the following query
  """
  type UserNif {
    "documentNumber is number of nif"
    documentNumber: String
    "fullName indicates the name of person our enterprise"
    documentFullName: String
    "documentState ensure that the user our enterprise is valid"
    documentState: String
    "documentType ensure if is user our enterprise with type singular our no"
    documentType: String
  }
  type Query {
    """
    consultNIF is in fact the type of query,
    where it receives a stopmeter which is the nif or
    BI Angolan number for the return of the information
    """
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
