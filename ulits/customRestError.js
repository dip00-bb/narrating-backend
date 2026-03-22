import { ApiError } from "./ApiError.js";

// when someone will try to edit a blog and if he not the author , this function will throw not permitted error
export const editorAndAuthorNotSame = (authorId, manipulator) => {
    if (authorId.toString() !== manipulator.toString()) {
        throw new ApiError(403, "Unauthorized! You are not permitted to edit the blog ")
    }
}

// this will be find a data in collection by it id and if id not found it will throw not found error. If found then return it. 
export const checkDocumentExist = async (model, filter) => {
    const document = await model.findOne(filter);
    
    if (!document) {
        return null
    }

    return document
}