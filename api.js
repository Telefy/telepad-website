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
    html: `<p>Hi Sir/Madam,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Transcation Successfully Completed,<BR>
    <b>Transaction Hash :</b> <a href='https://rinkeby.etherscan.io/tx/'>lllll</a><br>`
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
                          html: `<p>Hi Sir/Madam,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Transcation Successfully Completed,<BR>
                          <b>Transaction Hash :</b> <a href='https://rinkeby.etherscan.io/tx/${transaction.transactionHash}'>${transaction.transactionHash}</a><br>`
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
