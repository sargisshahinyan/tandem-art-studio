import base from './base';

export class EmailSvc {
  static async sendEmail(sendInfo = {}) {

    const requiredParams = [
      'name',
      'surname',
    ];

    const { data } = await base.post('emails', sendInfo);
    return data.message;
  }
}

export default EmailSvc;
