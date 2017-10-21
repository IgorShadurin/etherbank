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
    "constant": true,
    "inputs": [],
    "name": "usersCount",
    "outputs": [{"name": "", "type": "uint256", "value": "1"}],
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
    "name": "CreditRequests",
    "outputs": [{"name": "Id", "type": "uint256", "value": "2"}, {
        "name": "User",
        "type": "address",
        "value": "0x9a6ba5c96add06229f0f6d9f6b4bd39c4994eb43"
    }, {"name": "Sum", "type": "uint256", "value": "100000000000000000"}, {
        "name": "Days",
        "type": "uint256",
        "value": "999"
    }, {"name": "PercentPerDay", "type": "uint256", "value": "100000000000000000"}, {
        "name": "IsActive",
        "type": "bool",
        "value": false
    }, {
        "name": "PayBackUser",
        "type": "address",
        "value": "0x980f5ac0fe183479b87f78e7892f8002fb9d5401"
    }, {"name": "IsPaidBack", "type": "bool", "value": true}, {
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
    "outputs": [{"name": "", "type": "uint256", "value": "4"}],
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
    "constant": false,
    "inputs": [{"name": "requestId", "type": "uint256"}],
    "name": "returnLoan",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "UserAddress", "type": "address"}],
    "name": "getUserCreditsIds",
    "outputs": [{"name": "", "type": "uint256[]", "value": []}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}];
var contractWallet = '0x66EB47e2175960DE3762fb95F037CcBe714bB81D';
var bankContract;

$('.btn-buy').click(function () {
    // todo web3 call contract

});

checkWeb3Interval = setInterval(function () {
    if (typeof Web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log('web3 ok');
        alert('add contract info');
        bankContract = window.web3.eth.contract(contractAbi).at(contractWallet);
        console.log(bankContract);
        clearInterval(checkWeb3Interval);
        $('.goods-row').removeClass('hide');
        $('.web3-load').hide();
    } else {
        console.log('web3 not ok');
    }
}, 100);