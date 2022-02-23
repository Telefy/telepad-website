"use strict";
const axios = require("axios");
const mysql = require("mysql");
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
const tokens = require("./common/token.json");
const mailService = require("./library/email");
const provider = require("./library/provider");

var con = mysql.createConnection({ 
  host: "127.0.0.1",
  user: "root",
  password: "Sathish@123",
  database: "telefy",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.post("/entries", async function (req, res) {
    let response = {};
    try {
        let wei_amount = req.body.amount * 10 ** tokens[req.body.token].decimal;
        var post = `('${req.body.email}','${req.body.telegram_username}','${req.body.wallet_address}','${tokens[req.body.token].token}','${req.body.amount}','${wei_amount}')`;
        var sql = `INSERT INTO presale_entries (email,telegram_username,wallet_address,token,amount,wei_amount) values ${post}`;
        var query = await con.query(sql, post, function (err, result) {
          if (err) {
            response.data = err
            response.status= "FAILURE"
          } else {
            response.data = {
              "id": result.insertId,
              "token": tokens[req.body.token].token,
              "decimal": tokens[req.body.token].decimal
            }
            response.status= "SUCCESS"
          }
          res.status(200).json(response);            
        });
    } catch (err) {
        console.log(err);
        response.status = "FAILURE";
        response.data = err;
        res.status(200).json(response);
    }
});
router.get("/mailSend", async function (req, res) {
  var message = {
    from: "noreply.mazelon@gmail.com",
    to: "sathish@mazelon.com",
    subject: "Trascation Completed",
    html: `<!DOCTYPE html
                          PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
                          xmlns:o="urn:schemas-microsoft-com:office:office">
                        
                        <head>
                          <!--[if gte mso 9]>
                              <xml>
                                <o:OfficeDocumentSettings>
                                  <o:AllowPNG />
                                  <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                              </xml>
                            <![endif]-->
                          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                          <meta name="format-detection" content="date=no" />
                          <meta name="format-detection" content="address=no" />
                          <meta name="format-detection" content="telephone=no" />
                          <meta name="x-apple-disable-message-reformatting" />
                          <!--[if !mso]><!-->
                          <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i|Poppins:400,400i,700,700i"
                            rel="stylesheet" />
                          <!--<![endif]-->
                          <title>Telefy Mail</title>
                          <!--[if gte mso 9]>
                              <style type="text/css" media="all">
                                sup {
                                  font-size: 100% !important;
                                }
                              </style>
                            <![endif]-->
                        
                          <style type="text/css" media="screen">
                            /* Linked Styles */
                            body {
                              padding: 0 !important;
                              margin: 0 !important;
                              display: block !important;
                              min-width: 100% !important;
                              width: 100% !important;
                              background: #ffffff;
                              -webkit-text-size-adjust: none;
                            }
                        
                            a {
                              color: #9f19ab;
                              text-decoration: none;
                            }
                        
                            p {
                              padding: 0 !important;
                              margin: 0 !important;
                            }
                        
                            img {
                              -ms-interpolation-mode: bicubic;
                              /* Allow smoother rendering of resized image in Internet Explorer */
                            }
                        
                            .mcnPreviewText {
                              display: none !important;
                            }
                        
                            /* Mobile styles */
                            @media only screen and (max-device-width: 480px),
                            only screen and (max-width: 480px) {
                              .mobile-shell {
                                width: 100% !important;
                                min-width: 100% !important;
                              }
                        
                              .bg {
                                background-size: 100% auto !important;
                                -webkit-background-size: 100% auto !important;
                              }
                        
                              .text-header,
                              .m-center {
                                text-align: center !important;
                              }
                        
                              .center {
                                margin: 0 auto !important;
                              }
                        
                              .container {
                                padding: 20px 10px !important;
                              }
                        
                              .td {
                                width: 100% !important;
                                min-width: 100% !important;
                              }
                        
                              .m-br-15 {
                                height: 15px !important;
                              }
                        
                              .p30-15 {
                                padding: 30px 15px !important;
                              }
                        
                              .p0-15-30 {
                                padding: 0px 15px 30px 15px !important;
                              }
                        
                              .p0-15 {
                                padding: 0px 15px !important;
                              }
                        
                              .mpb30 {
                                padding-bottom: 30px !important;
                              }
                        
                              .mpb15 {
                                padding-bottom: 15px !important;
                              }
                        
                              .m-td,
                              .m-hide {
                                display: none !important;
                                width: 0 !important;
                                height: 0 !important;
                                font-size: 0 !important;
                                line-height: 0 !important;
                                min-height: 0 !important;
                              }
                        
                              .m-block {
                                display: block !important;
                              }
                        
                              .fluid-img img {
                                width: 100% !important;
                                max-width: 100% !important;
                                height: auto !important;
                              }
                        
                              .column,
                              .column-dir,
                              .column-top,
                              .column-empty,
                              .column-empty2,
                              .column-dir-top {
                                float: left !important;
                                width: 100% !important;
                                display: block !important;
                              }
                        
                              .column-empty {
                                padding-bottom: 30px !important;
                              }
                        
                              .column-empty2 {
                                padding-bottom: 10px !important;
                              }
                        
                              .content-spacing {
                                width: 15px !important;
                              }
                            }
                          </style>
                        </head>
                        
                        <body class="body" style="
                              padding: 0 !important;
                              margin: 0 !important;
                              display: block !important;
                              min-width: 100% !important;
                              width: 100% !important;
                              background: #ffffff;
                              -webkit-text-size-adjust: none;
                            ">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                            <tr>
                              <td align="center" valign="top">
                                <!-- Header -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td align="center">
                                      <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                        <tr>
                                          <td class="td" style="
                                                width: 650px;
                                                min-width: 650px;
                                                font-size: 0pt;
                                                line-height: 0pt;
                                                padding: 0;
                                                margin: 0;
                                                font-weight: normal;
                                              ">
                                            <!-- Header -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#50075c"
                                              style="padding: 10px">
                                              <tr>
                                                <td class="p30-15 tbrr" style="
                                                      padding: 10px 0px 10px 0px;
                                                      border-radius: 12px 12px 0px 0px;
                                                    ">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <th class="column-top" width="145" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                            vertical-align: top;
                                                          ">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="img m-center" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <img src="https://telefy.finance/assets/Images/tele.png" width="140" border="0" alt="" />
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </th>
                                                      <th class="column-empty2" width="1" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                            vertical-align: top;
                                                          "></th>
                                                      <th class="column" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                          ">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="text-header" style="
                                                                  color: #838586;
                                                                  font-family: Arial, sans-serif;
                                                                  font-size: 14px;
                                                                  line-height: 18px;
                                                                  text-align: right;
                                                                ">
                                                              <a href="https://telefy.finance/" target="_blank" class="link" style="
                                                                    color: #ff63ce;
                                                                    text-decoration: none;
                                                                  "><span class="link" style="
                                                                      color: #ff63ce;
                                                                      text-decoration: none;
                                                                    ">Home</span></a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </th>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                            <!-- END Header -->
                        
                                            <!-- CTA -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                <td class="p30-15" style="padding: 60px 40px 34px 40px" bgcolor="#f4f4f4">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td class="h3 center pb15" style="
                                                            color: #c70cd7;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 22px;
                                                            line-height: 32px;
                                                            text-align: center;
                                                            padding-bottom: 15px;
                                                          ">
                                                        Dear User!
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text center pb15" style="
                                                            color: #666666;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 17px;
                                                            line-height: 28px;
                                                            text-align: center;
                                                            padding-bottom: 15px;
                                                          ">
                                                        We have recieved your transaction. Tele Tokens
                                                        will be credited shortly
                                                        <span class="m-hide"><br /></span>
                                                        Please stay tuned with us!
                                                        <span class="m-hide"><br /><br /></span>
                                                        Thank You!
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td class="pb40"></td>
                                              </tr>
                                            </table>
                                            <!-- END CTA -->
                        
                                            <!-- Footer -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                              style="padding-top: 40px; background: #f4e3f7">
                                              <tr>
                                                <td class="p0-15-30" style="padding-bottom: 40px">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td align="center" style="padding-bottom: 30px">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://www.facebook.com/Telefy-104998872116794" target="_blank"><img
                                                                  src="./images/facebook.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://twitter.com/TelefyConnect" target="_blank"><img
                                                                  src="./images/twitter.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://www.instagram.com/telefy_tele/" target="_blank"><img
                                                                  src="./images/insta.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="15" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://t.me/telefydefi" target="_blank"><img src="./images/telegram.png"
                                                                  width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text-footer1 pb10" style="
                                                            color: #777777;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 14px;
                                                            line-height: 20px;
                                                            text-align: center;
                                                            padding-bottom: 10px;
                                                          ">
                                                        TeleFy Finance Limited ©2021 All rights
                                                        reserved.
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text-footer2 pb20" style="
                                                            color: #777777;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 12px;
                                                            line-height: 26px;
                                                            text-align: center;
                                                            padding-bottom: 20px;
                                                          ">
                                                        info@telefy.finance
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                            <!-- END Footer -->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!-- END Header -->
                              </td>
                            </tr>
                          </table>
                        </body>
                        
                        </html>`
};

  let mail = await mailService.sendMail(message);
})

router.put("/entries/:id", async function (req, res) {
    let response = {};
    try {
        var sql = `UPDATE presale_entries set status = '${req.body.status}',transcation_hash = '${req.body.transcationId}',error_msg='${req.body.error_msg}' where entry_id = ${req.params.id} limit 1`;
        var query = await con.query(sql, async function (err, result) {
          if (err) {
            response.data = err
            response.status= "FAILURE"
          } else {
            response.data = result
            response.status= "SUCCESS"
         

            if(req.body.transcationId){
              await provider.customHttpProvider.once(req.body.transcationId, async (transaction) => {
                console.log(transaction.transactionHash,"--------success---")
                let response_data = JSON.stringify(transaction);
                if(transaction.status == 1){

                  var sql = `UPDATE presale_entries set status = 'SUCCESS',response_data='${response_data}' where transcation_hash = '${transaction.transactionHash}' limit 1`;
                } else {
                  var sql = `UPDATE presale_entries set status = 'FAILURE',response_data='${response_data}' where transcation_hash = '${transaction.transactionHash}' limit 1`;
                }

                var query = await con.query(sql);
                var getQuery = await con.query(`SELECT * FROM presale_entries where transcation_hash = '${transaction.transactionHash}' limit 1`, async function(err, data){
                  if(err){
                    throw err
                  } else {
                    if(data.length > 0){
                      console.log(data,"------")
                         var message = {
                          from: "noreply.mazelon@gmail.com",
                          to: data[0].email,
                          subject: "Trascation Completed",
                          // html: `<p>Hi Sir/Madam,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Transcation Successfully Completed,<BR>
                          // <b>Transaction Hash :</b> <a href='https://rinkeby.etherscan.io/tx/${transaction.transactionHash}'>${transaction.transactionHash}</a><br>`
                          html: `<!DOCTYPE html
                          PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
                          xmlns:o="urn:schemas-microsoft-com:office:office">
                        
                        <head>
                          <!--[if gte mso 9]>
                              <xml>
                                <o:OfficeDocumentSettings>
                                  <o:AllowPNG />
                                  <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                              </xml>
                            <![endif]-->
                          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                          <meta name="format-detection" content="date=no" />
                          <meta name="format-detection" content="address=no" />
                          <meta name="format-detection" content="telephone=no" />
                          <meta name="x-apple-disable-message-reformatting" />
                          <!--[if !mso]><!-->
                          <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i|Poppins:400,400i,700,700i"
                            rel="stylesheet" />
                          <!--<![endif]-->
                          <title>Telefy Mail</title>
                          <!--[if gte mso 9]>
                              <style type="text/css" media="all">
                                sup {
                                  font-size: 100% !important;
                                }
                              </style>
                            <![endif]-->
                        
                          <style type="text/css" media="screen">
                            /* Linked Styles */
                            body {
                              padding: 0 !important;
                              margin: 0 !important;
                              display: block !important;
                              min-width: 100% !important;
                              width: 100% !important;
                              background: #ffffff;
                              -webkit-text-size-adjust: none;
                            }
                        
                            a {
                              color: #9f19ab;
                              text-decoration: none;
                            }
                        
                            p {
                              padding: 0 !important;
                              margin: 0 !important;
                            }
                        
                            img {
                              -ms-interpolation-mode: bicubic;
                              /* Allow smoother rendering of resized image in Internet Explorer */
                            }
                        
                            .mcnPreviewText {
                              display: none !important;
                            }
                        
                            /* Mobile styles */
                            @media only screen and (max-device-width: 480px),
                            only screen and (max-width: 480px) {
                              .mobile-shell {
                                width: 100% !important;
                                min-width: 100% !important;
                              }
                        
                              .bg {
                                background-size: 100% auto !important;
                                -webkit-background-size: 100% auto !important;
                              }
                        
                              .text-header,
                              .m-center {
                                text-align: center !important;
                              }
                        
                              .center {
                                margin: 0 auto !important;
                              }
                        
                              .container {
                                padding: 20px 10px !important;
                              }
                        
                              .td {
                                width: 100% !important;
                                min-width: 100% !important;
                              }
                        
                              .m-br-15 {
                                height: 15px !important;
                              }
                        
                              .p30-15 {
                                padding: 30px 15px !important;
                              }
                        
                              .p0-15-30 {
                                padding: 0px 15px 30px 15px !important;
                              }
                        
                              .p0-15 {
                                padding: 0px 15px !important;
                              }
                        
                              .mpb30 {
                                padding-bottom: 30px !important;
                              }
                        
                              .mpb15 {
                                padding-bottom: 15px !important;
                              }
                        
                              .m-td,
                              .m-hide {
                                display: none !important;
                                width: 0 !important;
                                height: 0 !important;
                                font-size: 0 !important;
                                line-height: 0 !important;
                                min-height: 0 !important;
                              }
                        
                              .m-block {
                                display: block !important;
                              }
                        
                              .fluid-img img {
                                width: 100% !important;
                                max-width: 100% !important;
                                height: auto !important;
                              }
                        
                              .column,
                              .column-dir,
                              .column-top,
                              .column-empty,
                              .column-empty2,
                              .column-dir-top {
                                float: left !important;
                                width: 100% !important;
                                display: block !important;
                              }
                        
                              .column-empty {
                                padding-bottom: 30px !important;
                              }
                        
                              .column-empty2 {
                                padding-bottom: 10px !important;
                              }
                        
                              .content-spacing {
                                width: 15px !important;
                              }
                            }
                          </style>
                        </head>
                        
                        <body class="body" style="
                              padding: 0 !important;
                              margin: 0 !important;
                              display: block !important;
                              min-width: 100% !important;
                              width: 100% !important;
                              background: #ffffff;
                              -webkit-text-size-adjust: none;
                            ">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                            <tr>
                              <td align="center" valign="top">
                                <!-- Header -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td align="center">
                                      <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                        <tr>
                                          <td class="td" style="
                                                width: 650px;
                                                min-width: 650px;
                                                font-size: 0pt;
                                                line-height: 0pt;
                                                padding: 0;
                                                margin: 0;
                                                font-weight: normal;
                                              ">
                                            <!-- Header -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#50075c"
                                              style="padding: 10px">
                                              <tr>
                                                <td class="p30-15 tbrr" style="
                                                      padding: 10px 0px 10px 0px;
                                                      border-radius: 12px 12px 0px 0px;
                                                    ">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <th class="column-top" width="145" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                            vertical-align: top;
                                                          ">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="img m-center" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <img src="https://telefy.finance/assets/Images/telefy-dark1.png" width="140" border="0" alt="" />
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </th>
                                                      <th class="column-empty2" width="1" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                            vertical-align: top;
                                                          "></th>
                                                      <th class="column" style="
                                                            font-size: 0pt;
                                                            line-height: 0pt;
                                                            padding: 0;
                                                            margin: 0;
                                                            font-weight: normal;
                                                          ">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="text-header" style="
                                                                  color: #838586;
                                                                  font-family: Arial, sans-serif;
                                                                  font-size: 14px;
                                                                  line-height: 18px;
                                                                  text-align: right;
                                                                ">
                                                              <a href="https://telefy.finance/" target="_blank" class="link" style="
                                                                    color: #ff63ce;
                                                                    text-decoration: none;
                                                                  "><span class="link" style="
                                                                      color: #ff63ce;
                                                                      text-decoration: none;
                                                                    ">Home</span></a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </th>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                            <!-- END Header -->
                        
                                            <!-- CTA -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                <td class="p30-15" style="padding: 60px 40px 34px 40px" bgcolor="#f4f4f4">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td class="h3 center pb15" style="
                                                            color: #c70cd7;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 22px;
                                                            line-height: 32px;
                                                            text-align: center;
                                                            padding-bottom: 15px;
                                                          ">
                                                        Dear User!
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text center pb15" style="
                                                            color: #666666;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 17px;
                                                            line-height: 28px;
                                                            text-align: center;
                                                            padding-bottom: 15px;
                                                          ">
                                                        We have recieved your transaction. Tele Tokens
                                                        will be credited shortly
                                                        <span class="m-hide"><br /></span>
                                                        Please stay tuned with us!
                                                        <span class="m-hide"><br />
                                                        
                                                        <b>${tokens[data[0].token].token} Amount :</b> ${data[0].amount}<br>
                                                        <b>Transaction Hash :</b> <a href='https://rinkeby.etherscan.io/tx/${transaction.transactionHash}'>${transaction.transactionHash}</a><br>
                                                        <br /></span>
                                                        Thank You!
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td class="pb40"></td>
                                              </tr>
                                            </table>
                                            <!-- END CTA -->
                        
                                            <!-- Footer -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                              style="padding-top: 40px; background: #f4e3f7">
                                              <tr>
                                                <td class="p0-15-30" style="padding-bottom: 40px">
                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td align="center" style="padding-bottom: 30px">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://www.facebook.com/Telefy-104998872116794" target="_blank"><img
                                                                  src="https://telefy.finance/assets/Images/facebook.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://twitter.com/TelefyConnect" target="_blank"><img
                                                                  src="https://telefy.finance/assets/Images/twitter.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="55" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://www.instagram.com/telefy_tele/" target="_blank"><img
                                                                  src="https://telefy.finance/assets/Images/insta.png" width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                            <td class="img" width="15" style="
                                                                  font-size: 0pt;
                                                                  line-height: 0pt;
                                                                  text-align: left;
                                                                ">
                                                              <a href="https://t.me/telefydefi" target="_blank"><img src="https://telefy.finance/assets/Images/telegram.png"
                                                                  width="15" height="15" border="0" alt="" /></a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text-footer1 pb10" style="
                                                            color: #777777;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 14px;
                                                            line-height: 20px;
                                                            text-align: center;
                                                            padding-bottom: 10px;
                                                          ">
                                                        TeleFy Finance Limited ©2021 All rights
                                                        reserved.
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td class="text-footer2 pb20" style="
                                                            color: #777777;
                                                            font-family: Arial, sans-serif;
                                                            font-size: 12px;
                                                            line-height: 26px;
                                                            text-align: center;
                                                            padding-bottom: 20px;
                                                          ">
                                                        info@telefy.finance
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                            <!-- END Footer -->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!-- END Header -->
                              </td>
                            </tr>
                          </table>
                        </body>
                        
                        </html>`
                      };

                      await mailService.sendMail(message);
                    }
                  }
                });
              })
            }
          }
          res.status(200).json(response);            
        });
        console.log(query.sql)
    } catch (err) {
        console.log(err);
        response.status = "FAILURE";
        response.data = err;
        res.status(200).json(response);
    }
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  console.log("Request was made to: " + req.originalUrl);
  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});
app.use('/', router);
app.listen(5000, () => {
  console.log("Server running on port 5000");
 });
