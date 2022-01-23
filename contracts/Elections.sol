pragma solidity ^0.5.0;

contract Elections{

	struct Candidate{
		uint id;
		string name;
		uint voteCount;
	}
	uint public candidateCount;

	mapping (uint => Candidate) public candidates;
	mapping (address => bool) public voters;
    // Constructor
    constructor () public {
        // candidate = "Candidate 1";
        addCandidate("Akshay Sir");
        addCandidate("Nikita Ma'am");
    }

    event CreateCandidate(
    	uint id,
		string name,
		uint voteCount
    	);

    event votedEvent(
    	address add,
    	bool vote
    	);

    function addCandidate (string  memory _name) private {
    	candidateCount++;
    	candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    	emit CreateCandidate(candidateCount, _name, 0);
    }

    function vote (uint _candidateId) public {
    	require(!voters[msg.sender]);
    	require(_candidateId > 0 && _candidateId <= candidateCount);

    	voters[msg.sender]=true;

    	candidates[_candidateId].voteCount++;

    	emit votedEvent(msg.sender, true);
    }
}