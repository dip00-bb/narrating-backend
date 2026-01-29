export function sendMail(to, sub, msg,transporter) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    })
}
