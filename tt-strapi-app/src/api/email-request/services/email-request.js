'use strict';

const { factories } = require('@strapi/strapi');
const nodemailer = require("nodemailer");

module.exports = factories.createCoreService('api::email-request.email-request', ({ strapi }) => ({
  async sendEmail(data) {
    console.log('sendEmail function called with data:', JSON.stringify(data, null, 2));

    const { adults, children, arrivalDate, description, email } = data;

    const emailRequest = {
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: "postmaster@sandbox35823f598f8a4b98bd0afccad17d029a.mailgun.org",
        pass: "c25130ec3d2e80ffe9ff717e8a2f524f-623e10c8-6f3040bb",
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
      console.log('Attempting to send email with content:', JSON.stringify(content, null, 2));
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
