import Blog from "../../model/Blog.js"

export const blogResolver={
    Query:{
        blogs: async (_,__,context)=>{
            const blogs=await Blog.find({})
            return blogs
        }
    }
}