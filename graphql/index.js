import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import { typeDefs } from "./schemas/typeDefs.js"
import { resolvers } from "./resolvers/index.js"
import { contextFunction } from "./context.js"



export const createApolloServer= async(app)=>{
    const server=new ApolloServer({
        typeDefs:typeDefs,
        resolvers:resolvers
    })

    await server.start()


    app.use(
        '/graphql',
        expressMiddleware(server,{
            context:contextFunction
        }),
        
    )
}

