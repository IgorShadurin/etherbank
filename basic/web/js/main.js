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
    "outputs": [{"name": "", "type": "uint256", "value": "0"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "returnLoan",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
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
var contractWallet = '0x12A704B1717caaf52E1e68fB4964E5b8B7006115';
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