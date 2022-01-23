pragma solidity ^0.5.0;

contract Elections{

	struct Candidate{
		uint id;
		string name;
		uint voteCount;
	}
	uint public candidateCount;			// Used to keep count of candidates and traverse on candidates list

	mapping (uint => Candidate) public candidates;			// list of candidates
	mapping (address => bool) public voters;				//list of voters who've voted
    // Constructor
    constructor () public {
        addCandidate("Aj Sir");
        addCandidate("Nj Ma'am");
    }

    event CreateCandidate(    								//event on create new candidate
    	uint id,
		string name,
		uint voteCount
    	);

    event votedEvent(										//Event emitted after voting function called
    	address add,
    	bool vote
    	);

    function addCandidate (string  memory _name) private {
    	candidateCount++;
    	candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    	emit CreateCandidate(candidateCount, _name, 0);
    }

    function vote (uint _candidateId) public {
    	require(!voters[msg.sender]);										//msg.sender is address of current user
    	require(_candidateId > 0 && _candidateId <= candidateCount);

    	voters[msg.sender]=true;

    	candidates[_candidateId].voteCount++;

    	emit votedEvent(msg.sender, true);
    }
}