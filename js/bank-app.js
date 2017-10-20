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
                    $scope.bankContract = $window.web3.eth.contract([/*abi here*/]).at(/*wallet here*/);
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