var checkWeb3Interval = null;
var contractAbi = [{
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "UserCreditsIds",
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "CollectorJobByRequest",
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "Days", "type": "uint256"}, {"name": "Sum", "type": "uint256"}, {
        "name": "PercentPerDay",
        "type": "uint256"
    }, {"name": "SellerAddress", "type": "address"}],
    "name": "buyForCredit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "FirstName", "type": "string"}, {"name": "LastName", "type": "string"}, {
        "name": "MiddleName",
        "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "ReturnCreditRequestId", "type": "uint256"}, {"name": "MoneyForSuccess", "type": "uint256"}],
    "name": "checkCreditCollector",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "usersCount",
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "Guarantors",
    "outputs": [{"name": "", "type": "address", "value": "0x"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "requestId", "type": "uint256"}],
    "name": "lendByCreditRequest",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "CollectorJobs",
    "outputs": [{"name": "Id", "type": "uint256", "value": "0"}, {
        "name": "CreditRequestId",
        "type": "uint256",
        "value": "0"
    }, {"name": "MoneyForSuccess", "type": "uint256", "value": "0"}, {
        "name": "Executor",
        "type": "address",
        "value": "0x0000000000000000000000000000000000000000"
    }, {"name": "IsComplete", "type": "bool", "value": false}, {"name": "IsExists", "type": "bool", "value": false}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "SellerAddress", "type": "address"}, {"name": "Years", "type": "uint256"}, {
        "name": "Sum",
        "type": "uint256"
    }, {"name": "PercentPerDay", "type": "uint256"}, {"name": "GuarantorsList", "type": "address[]"}],
    "name": "createMortgage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "CreditRequests",
    "outputs": [{"name": "Id", "type": "uint256", "value": "0"}, {
        "name": "User",
        "type": "address",
        "value": "0x0000000000000000000000000000000000000000"
    }, {"name": "Sum", "type": "uint256", "value": "0"}, {
        "name": "Days",
        "type": "uint256",
        "value": "0"
    }, {"name": "PercentPerDay", "type": "uint256", "value": "0"}, {
        "name": "IsActive",
        "type": "bool",
        "value": false
    }, {
        "name": "PayBackUser",
        "type": "address",
        "value": "0x0000000000000000000000000000000000000000"
    }, {"name": "IsPaidBack", "type": "bool", "value": false}, {
        "name": "IsDirectPayToSeller",
        "type": "bool",
        "value": false
    }, {"name": "SellerAddress", "type": "address", "value": "0x0000000000000000000000000000000000000000"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "users",
    "outputs": [{"name": "FirstName", "type": "string", "value": ""}, {
        "name": "LastName",
        "type": "string",
        "value": ""
    }, {"name": "MiddleName", "type": "string", "value": ""}, {"name": "Exists", "type": "bool", "value": false}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "addToPension",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "Pensions",
    "outputs": [{
        "name": "User",
        "type": "address",
        "value": "0x0000000000000000000000000000000000000000"
    }, {"name": "Sum", "type": "uint256", "value": "0"}, {"name": "ReturnDate", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "UserAddress", "type": "address"}, {"name": "Days", "type": "uint256"}, {
        "name": "Sum",
        "type": "uint256"
    }, {"name": "PercentPerDay", "type": "uint256"}, {
        "name": "IsDirectPay",
        "type": "bool"
    }, {"name": "DirectPayAddress", "type": "address"}],
    "name": "_creditRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "CreditRequestId",
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "Days", "type": "uint256"}, {"name": "Sum", "type": "uint256"}, {
        "name": "PercentPerDay",
        "type": "uint256"
    }],
    "name": "createCreditRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "CollectorJobId",
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "requestId", "type": "uint256"}],
    "name": "returnLoan",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "ReturnCreditRequestId", "type": "uint256"}, {"name": "MoneyForSuccess", "type": "uint256"}],
    "name": "createCollectorJob",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "UserAddress", "type": "address"}],
    "name": "getUserCreditsIds",
    "outputs": [{"name": "", "type": "uint256[]", "value": []}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "Years", "type": "uint256"}, {"name": "Receivers", "type": "address[]"}],
    "name": "openPension",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "PensionOwner", "type": "address"}, {"name": "ReturnToOwner", "type": "bool"}],
    "name": "closeAndReturnPension",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}];
var contractWallet = '0x5BeBb4616cFf11Cc28Ba3e82A65B04f08c7f9453';
var bankContract = null;

/*VK.init(function () {
 VK.addCallback('onSettingsChanged', function f(loc) {
 location.reload(true);
 });
 }, function () {
 location.reload(true);
 }, '5.68');*/

$('.btn-buy').click(function () {
    var currentButton = $(this);
    var price = currentButton.attr('eth-price');
    var days = 345345345;
    var sum = window.web3.toWei(price);
    var percentPerDay = window.web3.toWei(0.987654321);
    var sellerAddress = '0x9a6bA5C96AdD06229f0F6d9F6b4bD39C4994EB43';
    currentButton.attr('disabled', true);
    currentButton.text('Заявка на кредит отправляется в блокчейн..');
    bankContract.buyForCredit.sendTransaction(days, sum, percentPerDay, sellerAddress, function (error, result) {
        currentButton.text('Заявка отправлена!');
    });
});

/*$('.btn-open-market').click(function () {
 VK.callMethod("showSettingsBox", 134217728);
 });*/

checkWeb3Interval = setInterval(function () {
    if (typeof Web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log('web3 ok');
        bankContract = window.web3.eth.contract(contractAbi).at(contractWallet);
        console.log(bankContract);
        clearInterval(checkWeb3Interval);
        $('.goods-row').removeClass('hide');
        $('.web3-load').hide();
    } else {
        console.log('web3 not ok');
    }
}, 100);