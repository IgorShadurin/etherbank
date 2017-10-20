angular.module('bankApp', [])
    .controller('BankController', ['$scope', '$window', '$interval', function ($scope, $window, $interval) {
            $scope.name = "Криптобанк";
            $scope.sendRegistration = function () {
                // todo implement
            };
            $scope.isWeb3 = function () {
                // todo implement
                return true;
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