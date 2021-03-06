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
    struct CollectorJob {
    uint Id;
    uint CreditRequestId;
    uint MoneyForSuccess;
    address Executor;
    bool IsComplete;
    bool IsExists;
    }

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

    mapping (address => address[]) public Guarantors;

    mapping (uint => CollectorJob) public CollectorJobs;

    mapping (uint => uint) public CollectorJobByRequest;

    uint public CollectorJobId;

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
        // todo check sum for collector and for user. overpay
        uint CurrentCollectorJobId = CollectorJobByRequest[requestId];
        if (CollectorJobs[CurrentCollectorJobId].IsExists) {
            assert(CollectorJobs[CurrentCollectorJobId].IsComplete == false);
            CollectorJobs[CurrentCollectorJobId].Executor.transfer(CollectorJobs[CurrentCollectorJobId].MoneyForSuccess);
        }
    }

    function register(string FirstName, string LastName, string MiddleName)
    {
        assert(users[msg.sender].Exists != true);
        users[msg.sender] = User(FirstName, LastName, MiddleName, true);
        usersCount++;
    }

    function openPension(uint Years, address[] Receivers) payable {
        uint oneYear = 1 years;
        uint ReturnDate = block.timestamp + oneYear * Years;
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

    function createMortgage(address SellerAddress, uint Years, uint Sum, uint PercentPerDay, address[] GuarantorsList){
        assert(GuarantorsList.length >= 2);
        assert(UserCreditsIds[msg.sender].length >= 100);
        uint Days = Years * 365;
        _creditRequest(msg.sender, Days, Sum, PercentPerDay, true, SellerAddress);
        Guarantors[msg.sender] = GuarantorsList;
        SellerAddress.transfer(Sum);
        uint CreatedRequest = CreditRequestId - 1;
        CreditRequests[CreatedRequest].IsActive = false;
        CreditRequests[CreatedRequest].PayBackUser = address(this);
    }

    function createCollectorJob(uint ReturnCreditRequestId, uint MoneyForSuccess){
        CollectorJobs[CollectorJobId] = CollectorJob(CollectorJobId, ReturnCreditRequestId, MoneyForSuccess, address(0), false, true);
        CollectorJobByRequest[ReturnCreditRequestId] = CollectorJobId;
        CollectorJobId++;
    }

    function checkCreditCollector(uint ReturnCreditRequestId, uint MoneyForSuccess){
        CreditRequest memory request = CreditRequests[ReturnCreditRequestId];
        assert(request.IsActive == false);
        assert(request.IsPaidBack == false);
        uint CheckTime = 1 days;
        CheckTime = CheckTime * request.Days;
        assert(block.timestamp > CheckTime);
        //request.Sum += MoneyForSuccess;
        createCollectorJob(ReturnCreditRequestId, MoneyForSuccess);
    }
}
