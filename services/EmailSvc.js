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
    let transporter;
    try {
      transporter = createTransporter();
    } catch (e) {
      console.log(e);
      return null;
    }

    await transporter.sendMail(mailOptions);
    transporter.close();
  }
}

module.exports = EmailSvc;
