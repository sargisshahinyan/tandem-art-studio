const nodemailer = require('nodemailer');

const {
  EMAIL,
  EMAIL_PASSWORD,
} = process.env;

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    }
  });
}

class EmailSvc {
  static async sendEmail(mailOptions) {
    const transporter = createTransporter();

    await transporter.sendMail(mailOptions);
    transporter.close();
  }
}

module.exports = EmailSvc;
