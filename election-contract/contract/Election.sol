// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.17;

contract Election {
    address public admin;

    uint public electionNumber;

    mapping(uint => mapping(uint => Contestant)) public contestants;
	mapping(uint => Contestant[]) public details;

    // mapping(address => bool) public voters;
    mapping(uint => mapping(string => Voter)) private voters;
    string[] private users;

    uint public contestantCount;
	uint public totalVotes;

    enum PHASE {
        reg,
        voting,
        done,
        nothing
    }
    PHASE public state;

    struct Contestant {
        string name;
        uint voteCount;
        string party;
        uint age;
        string qualification;
    }

    struct Voter {
        bool hasVoted;
        uint vote;
    }

    function Election() public {
        admin = msg.sender;
        state = PHASE.nothing;
        electionNumber = 0;
    }

    function changeState(PHASE x) public onlyAdmin {
        if(x == PHASE.voting){
            require(contestantCount > 0);
        }
        state = x;
    }

    function search(string memory current_aadhar) public view returns (bool){
        for(uint i=0;i<users.length;i++){
            if(keccak256(current_aadhar) == keccak256(users[i])){
                return false;
            }
        }
        return true;
    }

    function hasVoted(string memory aadhar) public view returns (bool){
        return voters[electionNumber][aadhar].hasVoted;
    }

    function reset() public payable onlyAdmin {
        changeState(PHASE.nothing);
        electionNumber++;
        users = new string[](0);
        contestantCount = 0;
        totalVotes = 0;
        admin.transfer(this.balance);
    }

    function addContestant(
		string memory aadhar,
        string memory _name,
        string memory _party,
        uint _age,
        string memory _qualification
    ) public payable validState(PHASE.reg) {
        require(msg.value == 0.1 ether);
        contestantCount++;
        contestants[electionNumber][contestantCount] = Contestant(
            _name,
            0,
            _party,
            _age,
            _qualification
        );
		voterRegistration(aadhar);
    }

    function voterRegistration(
        string memory aadhar
    ) public validState(PHASE.reg) {
        users.push(aadhar);
		voters[electionNumber][aadhar].hasVoted = false;
    }

    function vote(uint _contestantId,string memory aadhar) public validState(PHASE.voting) {
        require(contestantCount > 0);
        require(!voters[electionNumber][aadhar].hasVoted);
        contestants[electionNumber][_contestantId].voteCount++;
        voters[electionNumber][aadhar].hasVoted = true;
        voters[electionNumber][aadhar].vote = _contestantId;
        totalVotes++;
    }

	function getResults() public onlyAdmin{
        changeState(PHASE.done);
        uint maxVotes = contestants[electionNumber][1].voteCount;
		for(uint i = 2;i <= contestantCount;i++){
			if(contestants[electionNumber][i].voteCount > maxVotes){
				maxVotes = contestants[electionNumber][i].voteCount;
			}
		}
		for(i = 1;i <= contestantCount;i++){
			if(contestants[electionNumber][i].voteCount == maxVotes){
				details[electionNumber].push(contestants[electionNumber][i]);
			}
		}
	}

    function voterCount() public view returns (uint){
        return users.length;
    }

    function detailCount() public view returns (uint){
        return details[electionNumber].length;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier validState(PHASE x) {
        require(state == x);
        _;
    }
}