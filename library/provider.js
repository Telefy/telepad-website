
require("dotenv").config({});
const Web3 = require("web3");
var ethers = require('ethers');  
let currentProvider = new Web3.providers.HttpProvider(process.env.HTTP_URL);
let customHttpProvider = new ethers.providers.Web3Provider(currentProvider);

module.exports = { customHttpProvider };