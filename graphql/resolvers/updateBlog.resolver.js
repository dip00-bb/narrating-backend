import { checkDocumentExist } from "../../ulits/customRestError.js";
import { editorAndAuthorNotSame, notFoundError } from "../custom_error/gqlCustomError.js";
import { redisKeys } from "../../ulits/redisUtils.js";
import redis from "../../db/redis.js";
import { ApiError } from "../../ulits/ApiError.js";
import Blog from "../../model/Blog.js";

export const updateBlogResolver = {
    Query: {
        stageUpBlog: async (_, args, context) => {
            const id = args.id
            let targetedBlog
            let existInDraft = true;

            if (!context.user) {
                throw new ApiError(401, "Unauthorize Access")
            }

            const selectedBlog = await checkDocumentExist(Blog, { _id: id })
            if (!selectedBlog) {
                notFoundError("No Blog Found")
            }

            editorAndAuthorNotSame(selectedBlog.creatorId, context.user._id, "You are not permitted to edit this blog")

            const targetedBlogKey = redisKeys.updatableBlog(id)

            targetedBlog = await redis.get(targetedBlogKey)



            if (!targetedBlog) {
                targetedBlog = {
                    "_id": selectedBlog._id,
                    "title": selectedBlog.title,
                    "coverImage": selectedBlog.coverImage,
                    "content": selectedBlog.content
                }

                existInDraft = false
            }

            if (existInDraft) {
                const parsedTargetedBlog = JSON.parse(targetedBlog)
                parsedTargetedBlog.existInDraft = existInDraft
                parsedTargetedBlog.updatableBlogId = id
                return parsedTargetedBlog
            } else {
                targetedBlog.updatableBlogId = id
                return { ...targetedBlog, existInDraft }
            }

        }
    }
}