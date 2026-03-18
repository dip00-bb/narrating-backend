import Blog from "../../model/Blog.js"

export const blogResolver={
    Query:{
        blogs: async (_,args,context)=>{
            
            const filter={}

            if(args.creatorId){
                filter.creatorId=args.creatorId
            }
            const blogs= await Blog.find(filter)
            return blogs
        }
    }
}