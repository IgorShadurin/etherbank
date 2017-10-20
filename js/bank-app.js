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
    }, {"name": "MiddleName", "type": "string", "value": ""}, {"name": "Exists", "type": "bool", "value": false}],
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
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}];
var contractWallet = '0xb68E7fC5db927561Cab0E9420083832755a81121';
angular.module('bankApp', [])
    .controller('BankController', ['$scope', '$window', '$interval', function ($scope, $window, $interval) {
            $scope.name = "Криптобанк";
            // contract web3 interface
            $scope.bankContract = null;
            // NOT_CHECKED, NOT_REGISTERED, REGISTERED, IN_PROGRESS, COMPLETE
            $scope.registrationStatus = 'NOT_CHECKED';
            $scope.accountText = '';

            $scope.creditRequest = {};
            $scope.creditRequest.sum = 0.1;
            $scope.creditRequest.days = 10;
            $scope.creditRequest.percentPerDay = 1;

            $scope.registration = {};
            $scope.registration.firstName = '';
            $scope.registration.lastName = '';
            $scope.registration.middleName = '';

            $scope.user = {};
            $scope.user.address = "Загрузка..";
            $scope.user.balance = "Загрузка..";
            $scope.user.firstName = "Загрузка..";
            $scope.user.lastName = "Загрузка..";
            $scope.user.middleName = "Загрузка..";
            $scope.user.fullBalance = function () {
                return $scope.user.balance + " ETH";
            };
            $scope.myCreditRequests = [];
            $scope.allCreditRequests = [];

            // check until web3 initialized
            $scope.web3Checker = $interval(function () {
                if ($scope.isWeb3()) {
                    $interval.cancel($scope.web3Checker);
                    $scope.web3Checker = undefined;
                }
            }, 100);

            $scope.sendRegistration = function () {
                console.log($scope.user);
                $scope.registrationStatus = "IN_PROGRESS";
                $scope.bankContract.register.sendTransaction($scope.registration.firstName, $scope.registration.lastName, $scope.registration.middleName, function (error, result) {
                    console.log(error);
                    // here will transaction id
                    console.log(result);
                    $scope.registrationStatus = "COMPLETE";
                });
            };

            // check and initialize web3
            $scope.isWeb3 = function () {
                if (typeof $window.Web3 !== 'undefined') {
                    $window.web3 = new Web3($window.web3.currentProvider);
                    console.log('web3 ok');
                    $scope.bankContract = $window.web3.eth.contract(contractAbi).at(contractWallet);
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
                $scope.bankContract.users.call($scope.user.address, function (error, result) {
                    console.log(error);
                    console.log(result);
                    $scope.user.firstName = result[0];
                    $scope.user.lastName = result[1];
                    $scope.user.middleName = result[2];
                    if (error !== undefined) {
                        // 3 - isRegistered
                        if (result[3] === true) {
                            $scope.registrationStatus = "REGISTERED";
                        } else {
                            $scope.registrationStatus = "NOT_REGISTERED";
                        }
                    } else {
                        if ($scope.registrationStatus !== "COMPLETE") {
                            $scope.registrationStatus = "NOT_REGISTERED";
                        }
                    }
                });
            };
            $scope.createCreditRequest = function () {
                $scope.bankContract.createCreditRequest.sendTransaction($scope.creditRequest.days, $window.web3.toWei($scope.creditRequest.sum, 'ether'), $window.web3.toWei($scope.creditRequest.percentPerDay, 'ether'), function (error, result) {
                    console.log(error);
                    // here will transaction id
                    console.log(result);
                });
            };
            $scope.lendByCreditRequest = function (requestId, requestSum, requestUser) {
                console.log('user: ' + requestUser);
                requestSum = $window.web3.toWei(requestSum);
                $scope.bankContract.lendByCreditRequest.sendTransaction(requestId, {
                    value: requestSum//,
                    //gas: 1900000
                    //to: requestUser
                }, function (error, result) {
                    console.log(error);
                    console.log(result);
                });
            };
            $scope.returnLoan = function () {
                // todo implement
            };
            $scope.getMyCreditRequests = function () {
                $scope.myCreditRequests = [];
                $scope.bankContract.getUserCreditsIds.call($scope.user.address, function (error, result) {
                    console.log(error);
                    console.log(result);
                    $.each(result, function (index, item) {
                        $scope.bankContract.CreditRequests.call(item.c[0], function (error, result) {
                            var id = result[1].c[0];
                            var sum = result[2].c[0] / 10000;
                            var days = result[3].c[0];
                            var percentPerDay = result[4].c[0] / 10000;
                            var isActive = result[5];

                            $scope.myCreditRequests.push({
                                id: id,
                                sum: sum,
                                days: days,
                                percentPerDay: percentPerDay,
                                isActive: isActive
                            });
                        });
                    });
                });
            };
            $scope.getActiveCreditRequests = function () {
                $scope.allCreditRequests = [];
                $scope.bankContract.CreditRequestId.call(function (error, result) {
                    console.log(result);
                    var requestsCount = result.c[0];
                    console.log('requests count ' + requestsCount);
                    var total = requestsCount - 10 > 0 ? requestsCount - 10 : requestsCount;
                    for (var i = 0; i < total; i++) {
                        $scope.bankContract.CreditRequests.call(i, function (error, result) {
                            console.log(error);
                            console.log(result);

                            var id = result[0].c[0];
                            var user = result[1];
                            var sum = result[2].c[0] / 10000;
                            var days = result[3].c[0];
                            var percentPerDay = result[4].c[0] / 10000;
                            var isActive = result[5];
                            $scope.allCreditRequests.push({
                                id: id,
                                user: user,
                                sum: sum,
                                days: days,
                                percentPerDay: percentPerDay,
                                isActive: isActive
                            });
                        });
                    }
                });
            };
            $interval(function () {
                if ($scope.isWeb3()) {
                    $window.web3.eth.getAccounts(function (wtf, data) {
                        if (data.length) {
                            var account = data[0];
                            $scope.user.address = account;
                            web3.eth.getBalance(account, function (wtf, data) {
                                $scope.user.balance = $window.web3.fromWei(data);
                            });
                            $scope.checkIsRegistered();
                        } else {
                            $scope.accountText = 'Введите пароль в своем аккаунте Metamask';
                        }
                    });

                }
            }, 1000);
        }]
    );