import gql from "graphql-tag";

export const blogTypeDefs=gql`
    type Blog{
        _id:ID!
        title:String!
        description:String!
    }


    type Query{
        blog:[Blog!]!
    }
`