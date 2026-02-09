import gql from "graphql-tag";

export const blogTypeDefs=gql`
    type Blog{
        _id:String!
        title:String!
        description:String!
    }


    type Query{
        blogs:[Blog!]!
    }
`