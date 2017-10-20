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
    "inputs": [],
    "name": "returnLoan",
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
    }, {"name": "IsPaidBack", "type": "bool", "value": false}],
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
    }, {"name": "MiddleName", "type": "string", "value": ""}],
    "payable": false,
    "stateMutability": "view",
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
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}];
var contractWallet = '0xb8a8a8a98a01726F35834396f97Cc4d3eC42D0a0';
angular.module('bankApp', [])
    .controller('BankController', ['$scope', '$window', '$interval', function ($scope, $window, $interval) {
            $scope.name = "Криптобанк";
            // contract web3 interface
            $scope.bankContract = null;

            // check until web3 initialized
            $scope.web3Checker = $interval(function () {
                if ($scope.isWeb3()) {
                    $interval.cancel($scope.web3Checker);
                    $scope.web3Checker = undefined;
                }
            }, 100);

            $scope.sendRegistration = function () {
                // todo implement
            };

            // check and initialize web3
            $scope.isWeb3 = function () {
                if (typeof $window.Web3 !== 'undefined') {
                    $window.web3 = new Web3($window.web3.currentProvider);
                    console.log('web3 ok');
                    $scope.bankContract = $window.web3.eth.contract([contractAbi]).at(contractWallet);
                    console.log($scope.bankContract);
                    $scope.checkNetwork();

                    return true;
                } else {
                    console.log('web3 not ok');
                    return false;
                }
            };

            // check is test network
            $scope.checkNetwork = function () {
                $window.web3.version.getNetwork(function (error, result) {
                    if (result !== "4") {
                        alert('Пожалуйста, подключитесь к тестовой сети Ethereum Rinkeby и обновите страницу');
                        $scope.isWeb3 = function () {
                            return false;
                        };
                    }
                });
            };

            $scope.checkIsRegistered = function () {
                // todo implement
                return true;
            };
            $scope.createCreditRequest = function () {
                // todo implement
            };
            $scope.returnLoan = function () {
                // todo implement
            };
        }]
    );