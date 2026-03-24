import { blogResolver } from "./blog.resolver.js";
import { updateBlogResolver } from "./updateBlog.resolver.js";

export const resolvers={
    Query:{
        ...blogResolver.Query,
        ...updateBlogResolver.Query
    }
}