// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.17;

contract Election{
	
	address private admin;

	mapping(uint => Contestant) public contestants; 

    // mapping(address => bool) public voters;
    mapping(address => Voter) private voters;

	// uint voter counter;
    uint public voterCount;

    // uint contestant counter;
	uint public contestantCount;

	enum PHASE{ reg, voting, done }
	PHASE public state;

	struct Contestant{
		uint id;
		string name;
		uint voteCount;
		string party;
		uint age;
		string qualification;
	}

	struct Voter{
		bool hasVoted;
		uint vote;
		bool isRegistered;
	}

	function Election() public{
		admin = msg.sender;
        state = PHASE.reg;
	}

    function changeState(PHASE x) onlyAdmin public{
		require(x > state);
        state = x;
    }

	function addContestant(string memory _name , string memory _party , uint _age , string memory _qualification) public onlyAdmin validState(PHASE.reg){
		contestantCount++;
		contestants[contestantCount] = Contestant(contestantCount,_name,0,_party,_age,_qualification);
	}

	function voterRegisteration(address user) public onlyAdmin validState(PHASE.reg){
        voterCount++;
		voters[user].isRegistered = true;
	}

	function vote(uint _contestantId) public validState(PHASE.voting){
        require(contestantCount > 0);
		require(voters[msg.sender].isRegistered);
		require(!voters[msg.sender].hasVoted);
        require(_contestantId > 0 && _contestantId <= contestantCount);
		contestants[_contestantId].voteCount++;
		voters[msg.sender].hasVoted = true;
		voters[msg.sender].vote = _contestantId;
	}

	modifier onlyAdmin(){
		require(msg.sender == admin);
		_;
	}
	
	modifier validState(PHASE x){
	    require(state == x);
	    _;
	}

}