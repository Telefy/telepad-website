const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
let nodemailer = require("nodemailer");
exports.createTransporter = async () => {
        const oauth2Client = new OAuth2(
  "63777654238-b7f2bav9ep8g5hcq6rhldktakc0th2dh.apps.googleusercontent.com", // ClientID
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
          
    
      oauth2Client.setCredentials({
    refresh_token:
      "1//04pY2PmhhEAC-CgYIARAAGAQSNgF-L9Irvid90jbdZUaVJJtDryqt1tTXGjixNXObeA-EdikshEcdDK8m8GwjqgMD4wmpoYejQw",
  });
    
      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :(");
          }
          resolve(token);
        });
      });
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "noreply.mazelon@gmail.com",
          accessToken,
          clientId:"63777654238-b7f2bav9ep8g5hcq6rhldktakc0th2dh.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//04pY2PmhhEAC-CgYIARAAGAQSNgF-L9Irvid90jbdZUaVJJtDryqt1tTXGjixNXObeA-EdikshEcdDK8m8GwjqgMD4wmpoYejQw",
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    
      return transporter;
    };
