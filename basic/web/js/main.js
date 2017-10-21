var checkWeb3Interval = null;
var contractAbi = [];
var contractWallet;
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