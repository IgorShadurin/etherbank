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
    bool IsDirectPayToSeller;
    address SellerAddress;
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

    function _creditRequest(address UserAddress, uint Days, uint Sum, uint PercentPerDay, bool IsDirectPay, address DirectPayAddress){
        CreditRequests[CreditRequestId] = CreditRequest(CreditRequestId, UserAddress, Sum, Days, PercentPerDay, true, address(0), false, IsDirectPay, DirectPayAddress);
        UserCreditsIds[msg.sender].push(CreditRequestId);
        CreditRequestId++;
    }

    function createCreditRequest(uint Days, uint Sum, uint PercentPerDay) {
        _creditRequest(msg.sender, Days, Sum, PercentPerDay, false, address(0));
    }

    function lendByCreditRequest(uint requestId) payable {
        CreditRequest memory request = CreditRequests[requestId];
        assert(request.IsActive == true);
        assert(request.Sum == msg.value);
        if (request.IsDirectPayToSeller) {
            request.SellerAddress.transfer(msg.value);
        }
        else {
            request.User.transfer(msg.value);
        }

        CreditRequests[requestId].IsActive = false;
        CreditRequests[requestId].PayBackUser = msg.sender;
    }

    function returnLoan() payable {

    }

    function register(string FirstName, string LastName, string MiddleName)
    {
        assert(users[msg.sender].Exists != true);
        users[msg.sender] = User(FirstName, LastName, MiddleName, true);
        usersCount++;
    }

    function buyForCredit(uint Days, uint Sum, uint PercentPerDay, address SellerAddress){
        _creditRequest(msg.sender, Days, Sum, PercentPerDay, true, SellerAddress);
    }
}
