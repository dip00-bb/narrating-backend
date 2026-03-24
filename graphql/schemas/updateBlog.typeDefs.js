import gql from "graphql-tag";

export const updatedBlogTypeDefs=gql`

    scalar JSON 



    type UpdateBlog{
        id:ID!,
        title:String!
        coverImage:String!
        content:JSON!
        updatableBlogId:ID!
        existInDraft:Boolean!
    }


    type Query{
        stageUpBlog (id:ID!):UpdateBlog!
    }

`