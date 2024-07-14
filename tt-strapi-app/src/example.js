const nodemailer = require("nodemailer");


const emailRequest = {
  "host": "smtp.mailgun.org",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "postmaster@sandbox35823f598f8a4b98bd0afccad17d029a.mailgun.org",
    "pass": "c25130ec3d2e80ffe9ff717e8a2f524f-623e10c8-6f3040bb",
  },
}
const send = async (data) => {
  await nodemailer.createTransport(emailRequest).sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      return info.response;
    }

  })
};
const content = {
  from: "joshua.1.9.kim@gmail.com",
  to: "joshua.1.9.kim@gmail.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
  html: "<h1>Testing some Mailgun awesomeness!</h1>"
}

send(content);
