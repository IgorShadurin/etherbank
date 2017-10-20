pragma solidity ^0.4.15;


contract mortal {
    /* Define variable owner of the type address */
    address owner;

    /* This function is executed at initialization and sets the owner of the contract */
    function mortal() {owner = msg.sender;}

    /* Function to recover the funds on the contract */
    function kill() {if (msg.sender == owner) selfdestruct(owner);}
}


contract Etherbank is mortal {
    struct CreditRequest {

    }

    struct Validation {
    address ValidatorAddress;
    bool FirstNameChecked;
    bool LastNameChecked;
    bool MiddleNameChecked;
    }

    struct User
    {
    string FirstName;
    string LastName;
    string MiddleName;
    // list of validator who validate
    mapping (address => Validation) Validations;
    }

    function Etherbank(){

    }

    function createCreditRequest() payable {

    }

    function returnLoan() payable {

    }
}
