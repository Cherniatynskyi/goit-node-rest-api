import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config({
  path: './envs/development.env'
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


export const sendEmail = async (data) => {
    const email = {...data, from: "t34markua@gmail.com"}
    await sgMail.send(email)
    return true
}


// const email = {
//   to: "facipis802@lendfash.com",
//   from: "t34markua@gmail.com",
//   subject: "Test email",
//   html: "<h1>Test Email</h1>"
// }

// sgMail.send(email)
//   .then(() => console.log("Succes"))
//   .catch(error => console.log(error.message) )