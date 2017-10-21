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
    struct Pension {
    address User;
    uint Sum;
    uint ReturnDate;
    address[] Receivers;
    }

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

    mapping (address => Pension) public Pensions;

    function Etherbank(){

    }

    function() payable {}

    function getUserCreditsIds(address UserAddress) constant returns (uint[]) {
        return UserCreditsIds[UserAddress];
    }

    function _creditRequest(address UserAddress, uint Days, uint Sum, uint PercentPerDay, bool IsDirectPay, address DirectPayAddress){
        CreditRequests[CreditRequestId] = CreditRequest(CreditRequestId, UserAddress, Sum, Days, PercentPerDay, true, address(0), false, IsDirectPay, DirectPayAddress);
        UserCreditsIds[UserAddress].push(CreditRequestId);
        CreditRequestId++;
    }

    function createCreditRequest(uint Days, uint Sum, uint PercentPerDay) {
        _creditRequest(msg.sender, Days, Sum, PercentPerDay, false, address(0));
    }

    function buyForCredit(uint Days, uint Sum, uint PercentPerDay, address SellerAddress){
        _creditRequest(msg.sender, Days, Sum, PercentPerDay, true, SellerAddress);
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

    function returnLoan(uint requestId) payable {
        CreditRequest memory request = CreditRequests[requestId];
        assert(request.IsPaidBack == false);
        assert(request.IsActive == false);
        assert(request.Sum == msg.value);
        request.PayBackUser.transfer(msg.value);
        CreditRequests[requestId].IsPaidBack = true;
    }

    function register(string FirstName, string LastName, string MiddleName)
    {
        assert(users[msg.sender].Exists != true);
        users[msg.sender] = User(FirstName, LastName, MiddleName, true);
        usersCount++;
    }

    function openPension(uint ReturnDate, address[] Receivers) payable {
        Pensions[msg.sender] = Pension(msg.sender, msg.value, ReturnDate, Receivers);
    }

    function addToPension() payable {
        assert(msg.value > 0);
        Pensions[msg.sender].Sum += msg.value;
    }

    function closeAndReturnPension(address PensionOwner, bool ReturnToOwner) payable {
        Pension memory pension = Pensions[PensionOwner];
        assert(block.timestamp >= pension.ReturnDate);
        if (ReturnToOwner) {
            pension.User.transfer(pension.Sum);
        }
        else {
            assert(block.timestamp >= (pension.ReturnDate + 1 years));
            uint pieceForOneReceiver = pension.Sum / pension.Receivers.length;
            for (uint i = 0; i < pension.Receivers.length; i++) {
                pension.Receivers[i].transfer(pieceForOneReceiver);
            }
        }
    }
}
