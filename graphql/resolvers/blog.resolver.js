
import redis from "../../db/redis.js"
import Blog from "../../model/Blog.js"
import Model from "../../model/Blog.js"
import { redisKeys } from "../../ulits/redisUtils.js"
import { notFoundError } from "../custom_error/gqlCustomError.js"

export const blogResolver = {
    Query: {
        blogs: async (_, args, context) => {

            const filter = {}

            if (args.creatorId) {
                filter.creatorId = args.creatorId
            }

            if (args.category) {
                filter.category = args.category
            }

            const blogs = await Blog.find(filter)

            if (!blogs || blogs.length == 0) {
                notFoundError("No Blog Found For This Author")
            }
            return blogs
        },

        blog: async (_, { id }, context) => {

            const key = redisKeys.blog(id)

            const cachedBlog = await redis.get(key) // look for cached data

            if (cachedBlog) {
                const parsedBlog = JSON.parse(cachedBlog)
                return parsedBlog // return cached data
            }


            const blog = await Blog.findOne({
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