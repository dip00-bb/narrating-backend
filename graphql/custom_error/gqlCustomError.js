import { GraphQLError } from "graphql"

export const notFoundError=(message)=>{
    throw new GraphQLError(message,{
        extensions:{
            code:"NOT_FOUND"
        }
    })
}

export const editorAndAuthorNotSame = (authorId, manipulator,message) => {
    if (authorId.toString() !== manipulator.toString()) {
        throw new GraphQLError(message,{
            extensions:{
                code:'PERMISSION DENIED'
            }
        })
    }
}