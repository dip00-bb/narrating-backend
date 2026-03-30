
import redis from "../../db/redis.js"
import Model from "../../model/Blog.js"
import { notFoundError } from "../custom_error/gqlCustomError.js"

export const blogResolver = {
    Query: {
        blogs: async (_, args, context) => {

            const filter = {}

            if (args.creatorId) {
                filter.creatorId = args.creatorId
            }

            if(args.category){
                filter.category=args.category
            }

            const blogs = await Model.Blog.find(filter)

            if (!blogs || blogs.length == 0) {
                notFoundError("No Blog Found For This Author")
            }
            return blogs
        },

        blog: async (_, { id }, context) => {

            const key = `blog:${id}:content`
            console.log(key)
            const cachedBlog = await redis.get(key) // look for cached data

            if(cachedBlog){ 
                const parsedBlog=JSON.parse(cachedBlog)
                return parsedBlog // return cached data
            }


            const blog = await Model.Blog.findOne({
                _id: id
            })

            // cache in redis

            const stringifiedBlog = JSON.stringify(blog)
            await redis.set(key, stringifiedBlog)
            await redis.expire(key, 2628000)


            if (!blog) {
                notFoundError("No Blog Found")
            }
            return blog
        }
    }
}