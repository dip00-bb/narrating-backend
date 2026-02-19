import gql from "graphql-tag";


export const blogTypeDefs = gql`
    scalar JSON
    type Blog{
        id: ID!
        creatorId: ID!
        title: String!
        coverImage: String
        content: JSON!
        createdAt: String!
        updatedAt: String!
    }


    type Query{
        blogs:[Blog!]!
    }
`