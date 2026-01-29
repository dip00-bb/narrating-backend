import axios from "axios"
import authConfig from "../auth.config.js"


export async function sendMail(emailData) {
    return await axios.post(authConfig.brevo_url, emailData, {
        headers: {
            'Content-Type': 'application/json',
            'api-Key': authConfig.brevo_api_key
        }
    })
}


export const generateEmailData = (reciver, token) => {

    return {
        sender: {
            name: 'Narrate It',
            email: authConfig.brevo_user
        },
        to: [
            {
                email: reciver
            }
        ],
        subject: 'Reset Password Token',
        htmlContent: `<html><body><h1>${token}</h1> </body> </html>`
    }
}