import {email, z} from 'zod'

export const userRegisterSchema=z.object({
    username:z.string(),
    email:z.email(),
    password:z.string()
}) 

export const userLoginSchema=z.object({
    email:z.email(),
    password:z.string()
})