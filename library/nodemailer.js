const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
let nodemailer = require("nodemailer");
exports.createTransporter = async () => {
  const oauth2Client = new OAuth2(
    "705907313495-1uv454ke7mqb2o64u6jcli7ggvgja7dk.apps.googleusercontent.com", // ClientID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04sh2wJDB2EdYCgYIARAAGAQSNgF-L9Ir6I4IlyVubEGwzUmhuognZ42vp3zGhoNFavN-OkGvVcd5VXEtIUJULL9TzzXwg09R-w",
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
      user: "info@telefy.finance",
      accessToken,
      clientId:
        "705907313495-1uv454ke7mqb2o64u6jcli7ggvgja7dk.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04sh2wJDB2EdYCgYIARAAGAQSNgF-L9Ir6I4IlyVubEGwzUmhuognZ42vp3zGhoNFavN-OkGvVcd5VXEtIUJULL9TzzXwg09R-w",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
};
