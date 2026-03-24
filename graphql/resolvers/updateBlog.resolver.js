import { checkDocumentExist } from "../../ulits/customRestError.js";
import Model from "../../model/Blog.js"
import { editorAndAuthorNotSame, notFoundError } from "../custom_error/gqlCustomError.js";
import Updatable from "../../model/UpdatableBlog.js";

export const updateBlogResolver = {
    Query: {
        stageUpBlog: async (_, args, context) => {
            const id = args.id
            let targetedBlog
            let existInDraft = true;


            const selectedBlog = await checkDocumentExist(Model.Blog, { _id: id })

            if (!selectedBlog) {
                notFoundError("No Blog Found")
            }

            editorAndAuthorNotSame(selectedBlog.creatorId, context.user._id, "You are not permitted to edit this blog")

            targetedBlog = await checkDocumentExist(Updatable, { updatableBlogId: id })

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
                targetedBlog.existInDraft=existInDraft
                return targetedBlog
            }else{
                targetedBlog.updatableBlogId=id
                return { ...targetedBlog, existInDraft }
            }
            
        }
    }
}