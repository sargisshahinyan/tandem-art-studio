const express = require('express');
const router = express.Router();

const { EMAIL } = process.env;

const EmailSvc = require(`${APP_PATH}/services/EmailSvc`);

router.post('/', async (req, res) => {
  try {
    const params = [
      'name',
      'surname',
      'email',
      'phone',
      'message',
    ];

    const missedParam = params.find(param => !req.body[param]);
    if (missedParam) {
      return res.status(400).json({
        message: `${missedParam} param is required`,
      });
    }

    const {
      name,
      surname,
      email,
      phone,
      message,
    } = req.body;

    await EmailSvc.sendEmail({
      from: email,
      to: EMAIL,
      subject: 'Contact message',
      html: `
        <p><b>Name: </b>${name}</p>
        <p><b>Surname: </b>${surname}</p>
        <p><b>Phone: </b>${phone}</p>
        <p><b>Message: </b>${message}</p>
      `.trim(),
    });

    res.json({
      message: 'Email sent successfully',
    });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;

