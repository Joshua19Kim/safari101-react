'use strict';

const { factories } = require('@strapi/strapi');
const nodemailer = require("nodemailer");

module.exports = factories.createCoreService('api::email-request.email-request', ({ strapi }) => ({
  async sendEmail(data) {
    const { adults, children, arrivalDate, description, email } = data;

    const emailRequest = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    const content = {
      from: "joshua.1.9.kim@gmail.com", // Use the Mailgun sandbox domain
      to: "joshua.1.9.kim@gmail.com",
      subject: "New Trip Request",
      text: `
        New trip request details:
        Adults: ${adults}
        Children: ${children}
        Arrival Date: ${arrivalDate}
        Client Email: ${email}
        Description: ${description}
      `,
      html: `<h1>New Trip Request</h1>
        <p>New trip request details:</p>
        <ul>
          <li>Adults: ${adults}</li>
          <li>Children: ${children}</li>
          <li>Arrival Date: ${arrivalDate}</li>
          <li>Client Email: ${email}</li>
          <li>Description: ${description}</li>
        </ul>
      `,
    };

    try {
      const transporter = nodemailer.createTransport(emailRequest);
      const info = await transporter.sendMail(content);
      console.log('Email sent successfully:', info);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },
}));
