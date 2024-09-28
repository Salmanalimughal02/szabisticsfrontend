const nodemailer = require("nodemailer");
const { bankingDetails } = require("../constants/Basic");

const sendForgotPasswordOtpEmail = (email, otp, userType) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    // afjgoacwipxnpula     app password for agri plus

    // let mailOptions = {
    //   from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
    //   to: email,
    //   subject: "Password Reset OTP for Szabistics Account",
    //   html: `<h1>${otp}</h1>`,
    // };

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Password Reset OTP for Szabistics Account",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset the password for your Szabistics account associated with this email address. To proceed with the password reset, please use the One-Time Password (OTP) provided below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 10px 20px; font-size: 24px; color: #ffffff; background-color: #007bff; border-radius: 5px;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email or contact our support team.</p>
      <p>Thank you,</p>
      <p>The Szabistics Team</p>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendVerificationOtpEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Email Verification OTP for Szabistics Account",
      html: `<h1>${otp}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendBankingDetailsEmail = (email) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Banking Details",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Banking Details</h2>
          <p>Hello,</p>
          <p>Please find your banking details below:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Account Title:</strong> ${bankingDetails.accountTitle}</li>
            <li><strong>Account Number:</strong> ${bankingDetails.accountNo}</li>
            <li><strong>IBAN:</strong> ${bankingDetails.iban}</li>
            <li><strong>Bank Name:</strong> ${bankingDetails.bankName}</li>
          </ul>
          <p>Please keep this information safe and secure. If you have any questions, feel free to contact our support team.</p>
          <p>Thank you,</p>
          <p>The Szabistics Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendPaymentApprovalEmail = (email, packageName) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Payment Approved for Your Package",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Payment Approval Notification</h2>
          <p>Hello,</p>
          <p>We are pleased to inform you that the payment for your package, <strong>${packageName}</strong>, has been approved by our platform. You can now proceed with the next steps.</p>
          <p>Thank you for choosing our service. If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,</p>
          <p>The Platform Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendPackageInitiationEmail = (email, packageName) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: "Package Initiation Approved",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Package Initiation Approved</h2>
          <p>Hello,</p>
          <p>We are happy to inform you that your package, <strong>${packageName}</strong>, has been approved by our platform and is now ready to be initiated.</p>
          <p>Please follow the necessary procedures to start the process. If you need assistance, our support team is here to help.</p>
          <p>Best regards,</p>
          <p>The Platform Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendPackageLocationUpdateEmail = (
  email,
  packageName,
  location,
  title,
  mapUrl,
  dateTime
) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: `Location Update for ${packageName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Package Location Update</h2>
          <p>Hello,</p>
          <p>We wanted to inform you that your package, <strong>${packageName}</strong>, has a new location update.</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Date & Time:</strong> ${new Date(
            dateTime
          ).toLocaleString()}</p>
          <p>You can view the location on Google Maps by clicking <a href="${mapUrl}" target="_blank">here</a>.</p>
          <p>Thank you for using our service.</p>
          <p>Best regards,</p>
          <p>The Platform Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

const sendConversationUpdateEmail = (email, packageName, dateTime) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    let mailOptions = {
      from: `NO-REPLY ${process.env.EMAIL_AUTH_USER}`,
      to: email,
      subject: `Conversation Update for ${packageName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Conversation Update</h2>
          <p>Hello,</p>
          <p>There has been a new update in the conversation regarding your package, <strong>${packageName}</strong>.</p>
          <p><strong>Date & Time:</strong> ${new Date(
            dateTime
          ).toLocaleString()}</p>
          <p>Please check your account for further details.</p>
          <p>Thank you for using our service.</p>
          <p>Best regards,</p>
          <p>The Platform Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email sending error: ", error);
        reject(error);
      } else {
        console.log("Email sent: ", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = {
  sendForgotPasswordOtpEmail,
  sendVerificationOtpEmail,
  sendBankingDetailsEmail,
  sendPaymentApprovalEmail,
  sendPackageInitiationEmail,
  sendPackageLocationUpdateEmail,
  sendConversationUpdateEmail,
};
