import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.RESEND_API) {
  console.log("Provide RESEND_API in side the .env file");
}

const resend = new Resend(process.env.RESEND_API);
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BinkeyIt <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
