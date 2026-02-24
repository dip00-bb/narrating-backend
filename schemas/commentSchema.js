import mongoose from 'mongoose'
import { z } from 'zod'
export const commentSchema = z.object({
    body: z.object({
        content: z
            .json()
    }),

    params: z.object({
        id:z.string().refine(
            (val)=>mongoose.Types.ObjectId.isValid(val),
            {
                error:"Invalid Blog Id"
            }
        )
    })
})

