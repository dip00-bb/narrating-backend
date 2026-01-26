import * as z from 'zod'

export const validator = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);

            if (result.success) {
                next()
            } else if (result.error instanceof z.ZodError) {
                console.log(result.error.issues[0].message)
                res.json({ message: "Invalid Information. Double Check Before Submit Data" })
            }

        } catch (error) {
            console.log(error)
            if (result.error instanceof z.ZodError) {
                res.json({ message: "Invalid Information. Double Check Before Submit Data" })
            }
        }
    }
}