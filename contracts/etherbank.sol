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
    uint Id;
    address User;
    uint Sum;
    uint Days;
    uint PercentPerDay;
    bool IsActive;
    address PayBackUser;
    bool IsPaidBack;
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
    bool Exists;
    // list of validators who already validate user
    mapping (address => Validation) Validations;
    }

    mapping (address => User) public users;

    mapping (uint => CreditRequest) public CreditRequests;

    uint public CreditRequestId;

    mapping (address => uint[]) public UserCreditsIds;

    uint public usersCount;

    function Etherbank(){

    }

    function() payable {}

    function getUserCreditsIds(address UserAddress) constant returns (uint[]) {
        return UserCreditsIds[UserAddress];
    }

    function createCreditRequest(uint Days, uint Sum, uint PercentPerDay) {
        CreditRequests[CreditRequestId] = CreditRequest(CreditRequestId, msg.sender, Sum, Days, PercentPerDay, true, address(0), false);
        UserCreditsIds[msg.sender].push(CreditRequestId);
        CreditRequestId++;
    }

    function returnLoan() payable {

    }

    function register(string FirstName, string LastName, string MiddleName)
    {
        assert(users[msg.sender].Exists != true);
        users[msg.sender] = User(FirstName, LastName, MiddleName, true);
        usersCount++;
    }
}
