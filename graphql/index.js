import { ApolloServer } from "@apollo/server"
import { typeDefs } from "./schemas/typeDefs"
import { resolvers } from "./resolvers"
import { expressMiddleware } from "@as-integrations/express5"


export const createApolloServer=async(app)=>{
    const server=new ApolloServer({
        typeDefs:typeDefs,
        resolvers:resolvers
    })

    await server.start()


    app.use(
        '/graphql',
        expressMiddleware(server)
    )
}

