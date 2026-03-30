import gql from "graphql-tag";


export const blogTypeDefs = gql`
    scalar JSON
    type Blog{
        id: ID!
        creatorId: ID!
        title: String!
        coverImage: String
        content: JSON!
        comments:ID!
        totalViews:Int!
        status:String!
        createdAt: String!
        updatedAt: String!
    }


    type Query{
        blogs(creatorId:ID category:String):[Blog!]!
        blog(id:ID!):Blog!
    }

`