require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { user_pass } = process.env

const sendMail = (data, email) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'survei808@gmail.com',
        pass: user_pass,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./template"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./template"),
        extName: ".html",
      })
    );
    const mailOptions = {
      from: '"Peworld - Hire job" <{noreply@gmail.com}>', // DARI SIAPA
      to: data.to, // DIKIRIM KEMANA
      subject: data.subject, // HEADER DARI EMAIL
      template: data.template, // ISI DARI EMAIL
      context: data.data, // DATA YANG NNTI BSA DIMASUKAN KE DALAM TEMPLATE
    };

    if (data.attachment) {
      if (data.attachment.length > 0) {
        mailOptions.attachment = data.attachment;
      }
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Email sent!${info.response} `);
        resolve(info.response);
      }
    });
  });

module.exports = sendMail;