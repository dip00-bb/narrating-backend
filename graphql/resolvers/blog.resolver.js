
import Model from "../../model/Blog.js"
import { notFoundError } from "../custom_error/gqlCustomError.js"

export const blogResolver={
    Query:{
        blogs: async (_,args,context)=>{
            
            const filter={}

            if(args.creatorId){
                filter.creatorId=args.creatorId
            }
            const blogs= await Model.Blog.find(filter)

            if(!blogs || blogs.length==0 ){
                notFoundError("No Blog Found For This Author")
            }
            return blogs
        },

        blog:async (_,{id},context)=>{

            const blog=await Model.Blog.findOne({
                _id:id
            })

            if(!blog){
                notFoundError("No Blog Found")
            }
            return blog
        }
    }
}