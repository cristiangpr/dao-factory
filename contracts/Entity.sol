pragma solidity ^0.5.0;
import "node_modules/@openzeppelin/contracts/ownership/Ownable.sol";


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

    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;

    }
    address public manager;
    uint public minimumContribution;
    mapping (address => bool) public collaborators;
    Request[] public requests;
    uint public collaboratorsCount;
    string public entityName;
    string public missionDescription;



     constructor(uint minimum, string memory name, string memory mission, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        entityName = name;
        missionDescription = mission;
         transferOwnership(manager);
    


    }
    function () external payable {}

    function contribute() public payable {
        require(msg.value > minimumContribution);

        collaborators[ msg.sender] = true;
        collaboratorsCount ++;
    }

    function createRequest(string memory  description, uint value, address payable recipient) public onlyOwner {
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

        require(collaborators[msg.sender]);
        require(!request.approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
       request.approvalCount ++;
    }
    function finalizeRequest(uint index) public onlyOwner {
        Request storage request = requests[index];
        require(request.approvalCount > (collaboratorsCount / 2));
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
          collaboratorsCount,
          manager,
          entityName,
          missionDescription
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}