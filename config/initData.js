const UsersSvc = require(`${APP_PATH}/services/UsersSvc`);
const EmailSvc = require(`${APP_PATH}/services/EmailSvc`);

const { EMAIL } = process.env;

async function initData() {
  try {
    if (await UsersSvc.adminExists()) return;

    const name = 'Admin';
    const username = 'admin';
    // generating random password
    const password = Math.random().toString(36).split('.').pop();

    await EmailSvc.sendEmail({
      from: EMAIL,
      to: EMAIL,
      subject: 'Password',
      html: '<p>Password: ' + password + '</p>'
    });

    await UsersSvc.addAdmin({
      name,
      username,
      password,
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = initData;
