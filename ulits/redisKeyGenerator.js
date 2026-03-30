export const redisKeys = {
    updatableBlog: (id) => `updatableBlog:${id}:content`,
    blog:(id)=> `blog:${id}:content`
}