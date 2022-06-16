const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Rupok Koiry <koiry.rupok@gmail.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: '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',
      },
    });
  }

  async send(subject, text, img = null) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: `<p>${text}</p>`,
      text: text,
    };
    if (img) {
      mailOptions.attachDataUrls = true;
      mailOptions.html = `
    <div>
        <p>${text}</p>
        <img src="${img}" alt="qr">
    </div>`;
    }
    await this.newTransport().sendMail(mailOptions);
  }

  async sendFriendNotification(firstName, profileName) {
    await this.send(
      'New friend request',
      `${firstName} has sent you a friend request on ${profileName}`
    );
  }

  async sendProfileQR(profileName, img) {
    await this.send(`QR Code of ${profileName}`, 'Here is your QR Code', img);
  }
}

module.exports = Email;
