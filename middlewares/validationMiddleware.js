import * as z from 'zod'

export const validator = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (result.success) {
            next()
        } else if (result.error instanceof z.ZodError) {
            console.log(result.error.issues[0].message)
            res.json({ message: result.error.issues })
        }
    }
}