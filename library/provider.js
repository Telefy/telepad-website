
require("dotenv").config({});
const Web3 = require("web3");
var ethers = require('ethers');  
let currentProvider = new Web3.providers.HttpProvider(process.env.HTTP_URL);
let customHttpProvider = new ethers.providers.Web3Provider(currentProvider);
const {JsonRpcProvider} = require("@ethersproject/providers");
// const bscProvider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
const bscProvider = new JsonRpcProvider('https://bsc-dataseed1.ninicoin.io')

module.exports = { customHttpProvider, bscProvider };