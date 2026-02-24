import {z} from 'zod'
export const blogSchema=z.object({
    coverImage:z.string(),
    title:z.string(),
    content:z.json()
})