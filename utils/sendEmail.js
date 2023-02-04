const { createTransport } = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

module.exports = async (to, subject, text) => {
  const transporter = await createTransport(
    new SMTPTransport({
      service: process.env.SMPT_SERVICES,
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.SMPT_EMAIL,
        pass: process.env.SMPT_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
    })
  );
  // await transporter.sendMail({
  // from : process.env.SMPT_EMAIL,
  //   to,
  //   subject,
  //   text,
  // });
  const options = {
    from: process.env.SMPT_EMAIL,
    to,
    subject,
    text: text,
  };
  transporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    else console.log(info);
  });
};
