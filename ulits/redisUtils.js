import redis from "../db/redis.js";

export const redisKeys = {
    updatableBlog: (id) => `updatableBlog:${id}:content`,
    blog: (id) => `blog:${id}:content`,
    draftBlog: (id) => `draft:${id}:content`,
    draftList:(id)=>`list:${id}:draft`
}


export const updateExitingString = async (key, updatedString, time) => {
    await redis.set(
        key,
        updatedString,
        "EX",
        time,
        "XX"
    );
}