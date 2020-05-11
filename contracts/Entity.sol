pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";




contract EntityFactory  {
    address[] public deployedEntities;

    function createEntity(string memory name, string memory mission, string memory tokenName, string memory tokenSymbol, uint rate) public {
        address newEntity = address(new Entity(name, mission, msg.sender, tokenName, tokenSymbol, rate));
        deployedEntities.push(address(newEntity));
      
    }
    function getDeployedEntities() public view returns(address[] memory) {
        return deployedEntities;
    }
}
contract Entity is Ownable {


    address public manager;

    mapping (address => bool) public members;
    Request[] public requests;
    uint public tokenRate;
    uint public membersCount;
    string public entityName;
    string public missionDescription;
  
    Token public token;
    
    
   

     constructor(string memory name, string memory mission, address creator, string memory tokenName, string memory tokenSymbol, uint rate) public {
        manager = creator;
        entityName = name;
        missionDescription = mission;
        tokenRate = rate;
         transferOwnership(manager);
         members[manager] = true;
         membersCount ++;
        token = new Token( tokenName, tokenSymbol, msg.sender);


    }
        struct Request {
        string description;
        uint value;
        uint compFactor;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;

    }
 
 

    function verify(address member) public onlyOwner {
       require(!members[member]);

        members[member] = true;
        membersCount ++;
    }
    
      function unverify(address member) public onlyOwner {
       require(members[member]);

        members[member] = false;
        membersCount --;
    }


    function createRequest(string memory  description, uint value, uint compFactor, address payable recipient) public  {
         require(members[msg.sender]);
         Request memory newRequest = Request ({
             description: description,
             value: value,
             compFactor: compFactor,
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
    function finalizeRequest(uint index) public onlyOwner {
      
        Request storage request = requests[index];
        require(request.approvalCount > (membersCount / 2));
        require(!request.complete);
        token.mint(request.recipient, request.value * request.compFactor);
        request.complete = true;
    }
      
       function contribute() public payable {
        
      
        uint256 value = msg.value * tokenRate;
         token.mint(msg.sender, value);
    }
    
   
    function sellTokens(address payable member,  uint amount) public onlyMembers {
       
       token.transferFrom(member, address(this), amount);
       member.transfer(amount / tokenRate);
    
      
      
    }

    function getSummary() public view returns (
       uint, uint, uint, address, string memory, string memory
      ) {
        return (
    
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
        

    modifier onlyMembers() {
        require(
            members[msg.sender],
            "Only members can call this function."
        );
        _;
    }


  
}

contract Token is ERC20, ERC20Detailed, ERC20Mintable {
 
    

    
     constructor( string memory name, string memory symbol, address minter) ERC20Detailed(name, symbol, 18) public {
      
        mint(minter, 0);
  
       
    }
}