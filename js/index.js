const initialize = async () => {
  let account;
  let provider;
  let chainId;
  let toAddress = "0x1cD0d9462181648d02F73f646F22EC1b1Cb7EBd0";
  // let baseUrl = "http://localhost:5000";
  let baseUrl = "https://telepadapi.telefy.finance";
  let binanceMainet = '0x38';
  // let binanceMainet = '0x61';
  let binanceTestnet = '0x61';
  let ethereumManinet = '0x1';
  // let ethereumManinet = '0x4';
  let ethereumTestnet = '0x4';
  let supportChainId = [ethereumTestnet,binanceTestnet,ethereumManinet,binanceMainet];
  let testnetChainId = [ethereumTestnet,binanceTestnet];
  // let testnetChainId = [];
  
  let balance
  let abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "chainId_",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "guy",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: true,
      inputs: [
        {
          indexed: true,
          internalType: "bytes4",
          name: "sig",
          type: "bytes4",
        },
        {
          indexed: true,
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "arg1",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "arg2",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "LogNote",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "PERMIT_TYPEHASH",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "guy",
          type: "address",
        },
      ],
      name: "deny",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "move",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "holder",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiry",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "allowed",
          type: "bool",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      name: "permit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "pull",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "push",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "guy",
          type: "address",
        },
      ],
      name: "rely",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "wad",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "version",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "wards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  let minAmount;
  let maxAmount;
  let metamask_api;
  let token;
  let decimal;
  let allTokens;
  $.getJSON("common/token.json", async function( data ) {
    allTokens = data
  })

  document.getElementById("checkMetaInstall").onclick = checkMetaInstall;
  document
    .getElementById("checkMetaInstall")
    .setAttribute("data-bs-toggle", "modal");
  document
    .getElementById("checkMetaInstall")
    .setAttribute("data-bs-target", "#walletModal");
  document.getElementById("accountInfo").setAttribute("hidden", true);

  provider = new Web3(window.ethereum);

  async function connectwallet() {
    if (isMetaMaskInstalled()) {
      account = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .catch((err) => {
          console.log(err);
        });
      chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      showChainId(chainId, account);
      showTokenS(chainId);
      if (account && account.length > 0) {
        document
          .getElementById("checkMetaInstall")
          .removeEventListener("onclick", checkMetaInstall);
        document
          .getElementById("checkMetaInstall")
          .removeAttribute("data-bs-toggle");
        document
          .getElementById("checkMetaInstall")
          .removeAttribute("data-bs-target");
        $("#checkMetaInstall").hide();
        $("#accountInfo").attr("hidden", false);
        $("#walletModal").modal("hide");
        $("#connectBuynow").text("");
      }
    } else {
      $("#walletModal").modal("hide");
      $("#accountInfo").attr("hidden", true);
      $("#accountInfo").hide();
      onboarding.startOnboarding();
    }
  }


  async function showTokenS(chainId) {
    $("#tokenCoin option").remove();
    if (chainId == ethereumManinet || chainId == ethereumTestnet) {
      $("#tokenCoin").append('<option value="">-Select Token-</option><option value="WETH">WETH</option><option value="USDC">USDC</option><option value="ETH">ETH</option>')
    } else if (chainId == binanceMainet || chainId == binanceTestnet) {
      $("#tokenCoin").append('<option value="">-Select Token-</option><option value="BNB">BNB</option><option value="BUSD">BUSD</option>')
    } else {
      $("#tokenCoin").append('<option value="">-Select Token-</option>')
    }
  }



  async function webstore() {
    onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  }

  async function checkMetaInstall() {
    if (!isMetaMaskInstalled()) {
      document.getElementById("changeMeta").innerHTML =
        '\n Click To Install Metamask <img class="wallet-logo" src="./assets/img/meta.png">';
      document.getElementById("changeMeta").onclick = webstore;
    } else {
      document.getElementById("changeMeta").onclick = connectwallet;
    }
  }
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const isMetaMaskNetwork = async () => {
    chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(chainId,"---network----")
    showChainId(chainId, account);
    showTokenS(chainId);
  };
  const isMetaMaskConnect = async () => {
    const connectivity = await window.ethereum.request({
      method: "eth_accounts",
    });
    account = connectivity;
    isMetaMaskNetwork();
    return Boolean(connectivity && connectivity.length > 0);
  };

  const checkConnectivity = async () => {
    let connect = await isMetaMaskConnect();
    if (connect) {
      document
        .getElementById("checkMetaInstall")
        .removeEventListener("onclick", checkMetaInstall);
      document
        .getElementById("checkMetaInstall")
        .removeAttribute("data-bs-toggle");
      document
        .getElementById("checkMetaInstall")
        .removeAttribute("data-bs-target");
      $("#checkMetaInstall").hide();
      $("#accountInfo").attr("hidden", false);
      $("#walletModal").modal("hide");
    }
  };

  if(window.ethereum){

    window.ethereum.on("chainChanged", (chain) => {
      console.log(chain,"---chanid");
      chainId = chain;
      showChainId(chain, account);
      showTokenS(chainId);
      $("#minContent").text("--")
      $("#maxContent").text("--")
      $("#tokenCoin").trigger("change");
      $("#tvalue").val("");
      if (supportChainId.indexOf(chain) != -1) {
        $("#connectNetwork").text("");
      }
    });

    window.ethereum.on("accountsChanged", async (newAccounts) => {
      console.log(newAccounts,"----")
      window.ethereum
        .request({
          method: "eth_getBlockByNumber",
          params: ["latest", false],
        })
        .then((block) => {
          console.log(block);
        });

      if (newAccounts.length == 0) {
        $("#checkMetaInstall").show();
        document.getElementById("checkMetaInstall").onclick = checkMetaInstall;
        document
          .getElementById("checkMetaInstall")
          .setAttribute("data-bs-toggle", "modal");
        document
          .getElementById("checkMetaInstall")
          .setAttribute("data-bs-target", "#walletModal");
        document.getElementById("accountInfo").setAttribute("hidden", true);
        account = "";
        $("#connectNetwork").text("");
      } else {
        const checkAccount = await window.ethereum.request({
          method: "eth_accounts",
        });
        account = checkAccount;
        document
          .getElementById("checkMetaInstall")
          .removeEventListener("onclick", checkMetaInstall);
        document
          .getElementById("checkMetaInstall")
          .removeAttribute("data-bs-toggle");
        document
          .getElementById("checkMetaInstall")
          .removeAttribute("data-bs-target");
        $("#checkMetaInstall").hide();
        $("#accountInfo").attr("hidden", false);
        $("#accountId").text(
          `${account[0].substr(0, 5)}...${account[0].substr(-5, 5)}`
        );
      }
    });
  }

  showChainId = async (id, account) => {
    if (account && account.length > 0) {
      $("#accountId").text(
        `${account[0].substr(0, 5)}...${account[0].substr(-5, 5)}`
      );
    }
    if (id == ethereumManinet) {
      $("#chainId").text("ETHEREUM");
    } else if (id == binanceMainet) {
      $("#chainId").text("BINANCE");
    } else if (id == "0x3") {
      $("#chainId").text("ROPSTEN");
    } else if (id == "0x2a") {
      $("#chainId").text("KOVAN");
    } else if (id == ethereumTestnet) {
      $("#chainId").text("RINKEBY");
    } else if (id == "0x5") {
      $("#chainId").text("GOERLI");
    } else if (id == binanceTestnet) {
      $("#chainId").text("BINANCE_TESTNET");
    }
  };

  async function sendToken(values, data,metamask_api) {
    
    let amount = ethers.utils.parseUnits(values.amount, data.data.decimal);
    if(!metamask_api) {
      let contract = new provider.eth.Contract(abi, String(data.data.token));
      contract.methods
        .transfer(toAddress, amount)
        .send({
          from: account[0],
        })
        .on("transactionHash", (res) => {

          let postData = {
            status: "SUBMITTED",
            transcationId: res,
            error_msg: "",
            id: data.data.id,
          };
          if (testnetChainId.indexOf(chainId) == -1) {
            if (chainId == binanceMainet) {
              transcationUpate(postData, "BINANCE");
            } else {
              transcationUpate(postData, "ETHEREUM");
            }
          } else {
            popupData(postData)
          }

        })
        .on("error", (err) => {
          console.log(err, "---errr---");
          let postData = {
            status: "REJECTED",
            transcationId: "",
            error_msg: err.message,
            id: data.data.id,
          };
          if (testnetChainId.indexOf(chainId) == -1) {            
            if (chainId == binanceMainet) {
              transcationUpate(postData, "BINANCE");
            } else {
              transcationUpate(postData, "ETHEREUM");
            }
          } else {
            popupData(postData)
          }
        })
        .then((result) => {
          Swal.fire({
            title: 'Your Transcation has been completed',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        });
    } else {
      try {
        const result = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account[0],
              to: toAddress,
              value: amount._hex,
            },
          ],
        });
        let postData = {
          status: "SUBMITTED",
          transcationId: result,
          error_msg: "",
          id: data.data.id,
        };
        if (testnetChainId.indexOf(chainId) == -1) {
          if (chainId == binanceMainet) {
            transcationUpate(postData, "BINANCE");
          } else {
            transcationUpate(postData, "ETHEREUM");
          }
        } else {
          popupData(postData)
        }

      } catch(err) {

        let postData = {
          status: "REJECTED",
          transcationId: "",
          error_msg: err.message,
          id: data.data.id,
        };
        if (testnetChainId.indexOf(chainId) == -1) {
            if (chainId == binanceMainet) {
              transcationUpate(postData, "BINANCE");
            } else {
              transcationUpate(postData, "ETHEREUM");
            }
        } else {
          popupData(postData)
        }
      }
    }
  }

  async function transcationUpate(data,type){
    let updateData = {
        status: data.status,
        transcationId: data.transcationId,
        error_msg: data.error_msg,
        network: type
      };
      
      $.ajax({
        type: "PUT",
        url: `${baseUrl}/entries/${data.id}`,
        data: updateData,
        success: function (response) {
         popupData(data)
        },
      });
  }

  function popupData(data){
    let title;
    let icon;
    if(data.status == "SUBMITTED"){
      title = "Transaction Submitted successfully, you will get an email confirmation once transaction is successful";
      icon = "info"
    } else {
      title = "Tranascation rejected from wallet";
      icon = "error"        
    }
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result["isConfirmed"]) {
        $('#buynow').attr('disabled', false)
        if(icon == "info"){                
          metamask_api = 0;
          token = 0;
          decimal = 0;
          balance = 0;
          minAmount = 0;
          maxAmount = 0;
          $("#presale-form")[0].reset()

        }
      }
    });
  }

  checkConnectivity();

  $.validator.addMethod(
    "Regex",
    function (value, element) {
      return (
        this.optional(element) ||
        (value > 0 && /^\d{0,10}(\.\d{0,10})?$/i.test(value))
      );
    },
    "Invalid Value"
  );

  $(document).ready(function () {
 

    $("#tokenCoin").change(async function (event) {
      if (event.target.value) {
        $("#tokenLable").text(`${event.target.value} Amount *`);

        if(event.target.value == "USDC"){
          $("#minContent").text(`50 ${event.target.value}`);  
          $("#maxContent").text(`5000 ${event.target.value}`);  
        } else if(event.target.value == "ETH"){
          
          $("#minContent").text(`0.02 ${event.target.value}`);  
          $("#maxContent").text(`2 ${event.target.value}`);
        } else if(event.target.value == "WETH"){
          
          $("#minContent").text(`0.02 ${event.target.value}`);  
          $("#maxContent").text(`2 ${event.target.value}`);
        } else if(event.target.value == "BUSD"){
          
          $("#minContent").text(`50 ${event.target.value}`);  
          $("#maxContent").text(`5000 ${event.target.value}`);
        } else if(event.target.value == "BNB"){
          
          $("#minContent").text(`0.1 ${event.target.value}`);  
          $("#maxContent").text(`20 ${event.target.value}`);
        }
        
        // $.getJSON( "common/token.json", async function( data ) {
          
        // })
      } else {
        $("#tokenLable").text(`Token Amount`);
      }
    });
    $("#presale-form").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        tokenCoin: "required",
        tvalue: {
          required: true,
          Regex: true,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") == "email") {
          error.insertAfter("#email").addClass("error-msg");
        }
        if (element.attr("name") == "tokenCoin") {
          error.insertAfter("#tokenCoin").addClass("error-msg");
        }
        if (element.attr("name") == "tvalue") {
          error.insertAfter("#tvalue").addClass("error-msg");
        }
      },
      messages: {
        email: "Please enter a valid email address",
        // tusername: "Please enter Username",
        // waddress: "Please enter Wallet Address",
        tokenCoin: "Please Select Token ",
        tvalue: {
          required: "Please enter amount",
          Regex: "Invalid Value",
        },
      },
      submitHandler: function (form) {
        if (account && account.length > 0) {
          if (supportChainId.indexOf(chainId) != -1) {
            var postData = {
              email: $("#email").val(),
              telegram_username: $("#tusername").val(),
              wallet_address: account[0],
              token: $("#tokenCoin").val(),
              amount: $("#tvalue").val(),
              network: (chainId == binanceMainet) ? 'BINANCE' : 'ETHEREUM' 
            };
            let chainName = $('#chainId').text();
            metamask_api = allTokens[chainName][postData.token].metamask_api
            token = allTokens[chainName][postData.token].token
            decimal = allTokens[chainName][postData.token].decimal
            if(!metamask_api){
              var tokenContract = new provider.eth.Contract(
                abi,
                String(allTokens[chainName][postData.token].token)
              );
              
              tokenContract.methods
                .balanceOf(String(account[0]))
                .call().then((res)=>{
                  console.log(res,"---ress")
                  balance = res
                  minAmount = allTokens[chainName][postData.token].min
                  maxAmount = allTokens[chainName][postData.token].max
                  getBalancewithAjax(postData,balance,metamask_api,chainId,testnetChainId,token,decimal,minAmount,maxAmount,baseUrl,sendToken,Swal)
                }).catch((error)=>{
                    console.log(error,"---er")
                    balance = 0;
                    minAmount = 0
                    maxAmount = 0
                    getBalancewithAjax(postData,balance,metamask_api,chainId,testnetChainId,token,decimal,minAmount,maxAmount,baseUrl,sendToken,Swal)
                })

            } else {
              minAmount = allTokens[chainName][postData.token].min
              maxAmount = allTokens[chainName][postData.token].max
              getBalancewithAjax(postData,balance,metamask_api,chainId,testnetChainId,token,decimal,minAmount,maxAmount,baseUrl,sendToken,Swal)
            }          
              

          } else {
            $("#connectNetwork").text(
              "Please Select Ethereum Or Binance in your Metamask"
            );
          }
        } else {
          $("#connectBuynow").text("Please connect metamask wallet to proceed!");
        }
      },
    });
  });
};


function getBalancewithAjax(postData,balance,metamask_api,chainId,testnetChainId,token,decimal,minAmount,maxAmount,baseUrl,sendToken,Swal){
  if((balance && balance > 0) || metamask_api == 1){
                  
    if(Number(postData.amount) >= Number(minAmount) && Number(postData.amount) <= Number(maxAmount)){

      if (testnetChainId.indexOf(chainId) != -1) {
        var data = {
          data: {
            token: token,
            decimal: decimal
          }
        }
        sendToken(postData, data,metamask_api);
      } else {
        
          $.ajax({
            type: "POST",
            url: `${baseUrl}/entries`,
            data: postData,
            success: function (data) {
              sendToken(postData, data,metamask_api);
            },
          });
      }
      $("#buynow").attr("disabled", true);
    } else {
      Swal.fire(
        "Oops...!",
        "Please check the minimum & maximum buy. Refer below for the Min and max eligibility",
        "error"
      );
    }
    
  } else {
    Swal.fire(
      "Oops...!",
      "You don't have a sufficient balance",
      "error"
    );
  }
}


function myTimer() {
  // console.log("---uuu---")
  let launchTime = new Date('2022-03-05T00:00:00');
  let currentLocalTime = new Date();
  let cDateMillisecs;
  let tDateMillisecs;
  let difference;
  let seconds;
  let minutes;
  let hours;
  let days;
  let estTimNow = new Date(currentLocalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  if (estTimNow.getTime() >= launchTime.getTime()) {

    let endTime1 = new Date('2022-03-20T00:00:00');
    let endTime2 = new Date('2022-04-11T00:00:00');
    let endTime3 = new Date('2022-04-26T23:59:59');
    let endTime4 = new Date('2022-05-26T23:59:59');
    let estTimNow = new Date(currentLocalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }))
    

    if(endTime1.getTime() >= currentLocalTime.getTime()){
      
      tDateMillisecs = endTime1.getTime();
      document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 1 Ends in :';
      
    } else if(endTime2.getTime() >= currentLocalTime.getTime()) {
      
      tDateMillisecs = endTime2.getTime();
      document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 2 Ends in :';

    } else if(endTime3.getTime() >= currentLocalTime.getTime()) {

      tDateMillisecs = endTime3.getTime();
      document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 3 Ends in :';
      $('#titleTag').html('Telefy | Pre-Sale')
      $('#saleText').html('Pre-Sale')
      $('#saleText1').html('Fill the below TELE form and participate in Pre-Sale')
      $('#saleText2').html('Pre-Sale registration to buy the Tele Tokens')

    } else if(endTime4.getTime() >= currentLocalTime.getTime()) {

      tDateMillisecs = endTime4.getTime();
      document.getElementById('presaleContent2').innerText = 'Private Sale Ends in :';
      $('#titleTag').html('Telefy | Private Sale')
      $('#saleText').html('Private Sale')
      $('#saleText1').html('Fill the below TELE form and participate in Private Sale')
      $('#saleText2').html('Private Sale registration to buy the Tele Tokens')
    }

    cDateMillisecs = estTimNow.getTime();
    difference = tDateMillisecs - cDateMillisecs;
    seconds = Math.floor(difference / 1000);
    
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('days2').innerText = days;
    document.getElementById('hours2').innerText = hours;
    document.getElementById('mins2').innerText = minutes;
    document.getElementById('seconds2').innerText = seconds;

  } else {

    cDateMillisecs = estTimNow.getTime();
    tDateMillisecs = launchTime.getTime();
    difference = tDateMillisecs - cDateMillisecs;
    seconds = Math.floor(difference / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('presaleContent').innerText = 'Pre-Sale Starts in :';
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('mins').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }

  
  setTimeout(this.myTimer, 1000);
}

myTimer()
window.addEventListener("DOMContentLoaded", initialize);
