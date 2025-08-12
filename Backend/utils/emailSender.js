const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL for port 465   
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (to, subject, content, isHtml = true) => {
  const mailOptions = {
    from: `"Nearby Happenings" <${process.env.EMAIL_USER}>`, // ✅ Correctly using template literal
    to,
    subject,
    [isHtml ? 'html' : 'text']: content // ✅ Dynamic key for html or text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`); // ✅ Use backticks for interpolation
  } catch (error) {
    console.error(`❌ Failed to send to ${to}:`, error.message); // ✅ Fixed syntax
  }
};

module.exports = { sendEmail };
