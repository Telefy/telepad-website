const initialize = async () => {
  let account;
  let provider;
  let chainId;
  let toAddress = "0xC22aB573D17632CcDc358744E4D6C7ca570e58CE";
  let baseUrl = "http://localhost:5000";
  let supportChainId = ['0x4','0x61'];
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
          params: [{ chainId: "0x1" }],
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
    if (chainId == "0x4") {
      $("#tokenCoin").append('<option value="">-Select Token-</option><option value="WETH">WETH</option><option value="USDC">USDC</option><option value="DAI">DAI</option>')
    } else if (chainId == "0x61") {
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

    window.ethereum.on("accountsChanged", (newAccounts) => {
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
      }
    });
  }

  showChainId = async (id, account) => {
    if (account && account.length > 0) {
      $("#accountId").text(
        `${account[0].substr(0, 5)}...${account[0].substr(-5, 5)}`
      );
    }
    if (id == "0x1") {
      $("#chainId").text("Ethereum");
    } else if (id == "0x38") {
      $("#chainId").text("Binance");
    } else if (id == "0x3") {
      $("#chainId").text("Ropsten");
    } else if (id == "0x2a") {
      $("#chainId").text("Kovan");
    } else if (id == "0x4") {
      $("#chainId").text("Rinkeby");
    } else if (id == "0x5") {
      $("#chainId").text("Goerli");
    } else if (id == "0x61") {
      $("#chainId").text("Binance Test");
    }
  };

  async function sendToken(values, data) {
    
    let amount = ethers.utils.parseUnits(values.amount, data.data.decimal);

    
    let contract = new provider.eth.Contract(abi, String(data.data.token));
    contract.methods
      .transfer(toAddress, amount)
      .send({
        from: account[0],
      })
      .on("transactionHash", (res) => {
        console.log(res, "--", chainId, "---chainId");
        let postData = {
          status: "SUBMITTED",
          transcationId: res,
          error_msg: "",
          id: data.data.id,
        };
        if (chainId == "0x61") {
          transcationUpate(postData, "BINANCE");
        } else {
          transcationUpate(postData, "ETHEREUM");
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
        if (chainId == "0x61") {
          transcationUpate(postData, "BINANCE");
        } else {
          transcationUpate(postData, "ETHEREUM");
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
  }

  async function transcationUpate(data,type){
    let updateData = {
        status: data.status,
        transcationId: data.transcationId,
        error_msg: data.error_msg,
        network: type
      };
      let title;
      let icon;
      if(data.status == "SUBMITTED"){
        title = "Tranascation submitted successfully, You will get e-mail once transaction succeed";
        icon = "info"
      } else {
        title = "Tranascation rejected from wallet";
        // title = "please check you have imported the token in your wallet and try again";
        icon = "error"
        
      }
      $.ajax({
        type: "PUT",
        url: `${baseUrl}/entries/${data.id}`,
        data: updateData,
        success: function (data) {
          Swal.fire({
            title: title,
            icon: icon,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result["isConfirmed"]) {
              $('#buynow').attr('disabled', false)
              if(icon == "info"){                
                // window.location.reload();
                $("#presale-form")[0].reset()

              }
            }
          });
        },
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
   
    

    $("#tokenCoin").change(function (event) {
      if (event.target.value) {
        $("#tokenLable").text(`${event.target.value} Amount`);

        if(event.target.value == "USDC"){
          $("#minContent").text(`500 ${event.target.value}`);  
          $("#maxContent").text(`5000 ${event.target.value}`);  
        } else if(event.target.value == "ETH"){
          
          $("#minContent").text(`0.02 ${event.target.value}`);  
          $("#maxContent").text(`2 ${event.target.value}`);
        } else if(event.target.value == "WETH"){
          
          $("#minContent").text(`0.02 ${event.target.value}`);  
          $("#maxContent").text(`2 ${event.target.value}`);
        } else if(event.target.value == "BUSD"){
          
          $("#minContent").text(`500 ${event.target.value}`);  
          $("#maxContent").text(`5000 ${event.target.value}`);
        } else if(event.target.value == "BNB"){
          
          $("#minContent").text(`1 ${event.target.value}`);  
          $("#maxContent").text(`20 ${event.target.value}`);
        }
        
        $.getJSON( "common/token.json", async function( data ) {
          var tokenContract = new provider.eth.Contract(
            abi,
            String(data[event.target.value].token)
          );
          
          balance = await tokenContract.methods
            .balanceOf(String(account[0]))
            .call(function(error, result){
              console.log(error,"--error")
              if(error){
                balance = 0;
                minAmount = 0
                maxAmount = 0
              } else {
                balance = result
                minAmount = data[event.target.value].min
                maxAmount = data[event.target.value].max
              }
            })
        })
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
          console.log(chainId, "---");
          if (supportChainId.indexOf(chainId) != -1) {
           
              if(balance && balance > 0){
                  var postData = {
                    email: $("#email").val(),
                    telegram_username: $("#tusername").val(),
                    wallet_address: account[0],
                    token: $("#tokenCoin").val(),
                    amount: $("#tvalue").val(),
                  };
                if(Number(postData.amount) >= Number(minAmount) && Number(postData.amount) <= Number(maxAmount)){

                  console.log(postData, "---post");
                  $("#buynow").attr("disabled", true);
                  $.ajax({
                    type: "POST",
                    url: `${baseUrl}/entries`,
                    data: postData,
                    success: function (data) {
                      sendToken(postData, data);
                    },
                  });
                } else {
                  Swal.fire(
                    "Oops...!",
                    "Please check the min Buy & max Buy.",
                    "error"
                  );
                }
                
              } else {
                Swal.fire(
                  "Oops...!",
                  "You don't have a suffienct balance.",
                  "error"
                );
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


window.addEventListener("DOMContentLoaded", initialize);
