var checkWeb3Interval = null;
$('.btn-buy').click(function () {
    // todo web3 call contract

});

checkWeb3Interval = setInterval(function () {
    if (typeof Web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log('web3 ok');
        //$scope.bankContract = $window.web3.eth.contract(contractAbi).at(contractWallet);
        //console.log($scope.bankContract);
        //$scope.checkNetwork();
        clearInterval(checkWeb3Interval);
        $('.goods-row').removeClass('hide');
        $('.web3-load').hide();
        //return true;
    } else {
        console.log('web3 not ok');
        //return false;
    }
}, 100);