const initialize = async () => {
  let account;
  let provider;
  let chainId;
  let toAddress = "0xC22aB573D17632CcDc358744E4D6C7ca570e58CE";
  let baseUrl = "http://localhost:5000";
  let supportChainId = '0x4';

  document.getElementById("checkMetaInstall").onclick = checkMetaInstall;
  document
    .getElementById("checkMetaInstall")
    .setAttribute("data-bs-toggle", "modal");
  document
    .getElementById("checkMetaInstall")
    .setAttribute("data-bs-target", "#walletModal");
  document.getElementById("accountInfo").setAttribute("hidden", true);
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }


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
      chainId = await ethereum.request({
        method: "eth_chainId",
      });
      showChainId(chainId, account);
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
    chainId = await ethereum.request({
      method: "eth_chainId",
    });
    showChainId(chainId, account);
  };
  const isMetaMaskConnect = async () => {
    const connectivity = await ethereum.request({
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

  window.ethereum.on("chainChanged", (chain) => {
    console.log(chain);
    chainId = chain;
    showChainId(chain, account);
    if (chain == supportChainId) {
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
    }
  };

  async function sendToken(values, data) {
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
    console.log(String(data.data.token), "--token data");
    let contract = new ethers.Contract(
      String(data.data.token),
      abi,
      provider.getSigner()
    );
    let amount = ethers.utils.parseUnits(values.amount, data.data.decimal);
    console.log(amount, "---amountt---");
    let tx = contract
      .transfer(toAddress, amount)
      .then((res) => {
        console.log(res);
        let updateData = {
          status: "SUBMITTED",
          transcationId: res.hash,
          error_msg: "",
        };
        $.ajax({
          type: "PUT",
          url: `${baseUrl}/entries/${data.data.id}`,
          data: updateData,
          success: function (data) {
            Swal.fire({
              title:
                "Tranascation Successfully Submitted, Shortly You`ll Receive Mail",
              icon: "info",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result["isConfirmed"]) {
                window.location.reload();
              }
            });
          },
        });
        // provider.once(res.hash, (transaction) => {})
      })
      .catch((err) => {
        console.log(err);
        let updateData = {
          status: "REJECTED",
          transcationId: "",
          error_msg: err.message,
        };
        $.ajax({
          type: "PUT",
          url: `${baseUrl}/entries/${data.data.id}`,
          data: updateData,
          success: function (data) {
            Swal.fire({
              title: "Tranascation Rejected",
              icon: "error",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result["isConfirmed"]) {
                window.location.reload();
              }
            });
          },
        });
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
          if (chainId == supportChainId) {
            var postData = {
              email: $("#email").val(),
              telegram_username: $("#tusername").val(),
              wallet_address: account[0],
              token: $("#tokenCoin").val(),
              amount: $("#tvalue").val(),
            };
            console.log(postData, "---post");
            $.ajax({
              type: "POST",
              url: `${baseUrl}/entries`,
              data: postData,
              success: function (data) {
                sendToken(postData, data);
              },
            });
          } else {
            $("#connectNetwork").text("Only Etherum Network is Supported!");
          }
        } else {
          $("#connectBuynow").text("Please Connect Metamask Wallet To Proceed!");
        }
      },
    });
  });
};

window.addEventListener("DOMContentLoaded", initialize);
