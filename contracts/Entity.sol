pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";



contract EntityFactory  {
    address[] public deployedEntities;

    function createEntity(uint minimum, string memory name, string memory mission) public {
        address newEntity = address(new Entity(minimum, name, mission, msg.sender));
        deployedEntities.push(address(newEntity));
      
    }
    function getDeployedEntities() public view returns(address[] memory) {
        return deployedEntities;
    }
}
contract Entity is Ownable {


    address public manager;
    uint public minimumContribution;
    mapping (address => bool) public members;
    Request[] public requests;
  
    uint public membersCount;
    string public entityName;
    string public missionDescription;
   

     constructor(uint minimum, string memory name, string memory mission, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        entityName = name;
        missionDescription = mission;
         transferOwnership(manager);
    


    }
        struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;

    }
 
    function () external payable {}

    function verify(address member) public onlyOwner {
       require(!members[member]);

        members[ member] = true;
        membersCount ++;
    }
    
      function unverify(address member) public onlyOwner {
       require(members[member]);

        members[ member] = false;
        membersCount --;
    }


    function createRequest(string memory  description, uint value, address payable recipient) public  {
         require(members[msg.sender]);
         Request memory newRequest = Request ({
             description: description,
             value: value,
             recipient: recipient,
             complete: false,
             approvalCount: 0

         });
         requests.push(newRequest);
        
    }
    
function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(members[msg.sender]);
        require(!request.approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
       request.approvalCount ++;
    }
    function finalizeRequest(uint index) public  {
        require(msg.sender == manager);
        Request storage request = requests[index];
        require(request.approvalCount > (membersCount / 2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
  
    function getSummary() public view returns (
      uint, uint, uint, uint, address, string memory, string memory
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          membersCount,
          manager,
          entityName,
          missionDescription
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
        address[] public deployedTokens;

    function createToken(uint initialSupply, string memory name, string memory symbol) public onlyOwner {
        address newToken = address(new Token(initialSupply, name, symbol, msg.sender));
        deployedTokens.push(address(newToken));
    
      
    }
    function getDeployedTokens() public view returns(address[] memory) {
        return deployedTokens;
    }
            address[] public deployedCrowdsales;

    function createCrowdsale(uint256 rate, address payable wallet,  IERC20 token) public onlyOwner {
        address newCrowdsale = address(new SimpleCrowdsale(rate, wallet, token));
        deployedCrowdsales.push(address(newCrowdsale));
    
      
    }
    function getDeployedCrowdsales() public view returns(address[] memory) {
        return deployedCrowdsales;
    }
}

contract SimpleCrowdsale is Crowdsale {
    constructor (
        uint256 rate,
        address payable wallet,
        IERC20 token
    )
        public
        Crowdsale(rate, wallet, token)
    {
    }
  
}

contract Token is ERC20, ERC20Detailed, ERC20Mintable {
 


    
     constructor(uint256 initialSupply, string memory name, string memory symbol, address minter) ERC20Detailed(name, symbol, 18) public {
 
        mint(minter, initialSupply);
        addMinter(minter);
       
    }
}