const { createTransport } = require("nodemailer");

module.exports = async (to, subject, text) => {
  const transporter = createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_EMAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  await transporter.sendMail({
    to,
    subject,
    text,
    // from: process.env.SMPT_EMAIL,
  });
};
