import React, { useEffect, useState } from "react";
import { contractTS, setPage } from "../interfaces/pages";
import Card from "../assets/Card";

const Voting = ({ aadhar,phase, hasVoted, setHasVoted, election, web3 }: any) => {
    const [electionNumber, setElectionNumber] = useState();
    const [contCount, setContCount] = useState(0);
    const [contestants, setContestants] = useState([]);
    useEffect(() => {
        election.methods.electionNumber().call().then((res:any) => {
            setElectionNumber(Number(res));
            // console.log(typeof (electionNumber), electionNumber);
        })
        election.methods.contestantCount().call().then((res:any) => {
            setContCount(res);
        })
        for (let i = 1; i <= contCount; i++){
            election.methods.contestants(electionNumber,i).call()
                .then((res: any) => {
                    setContestants((prev) => [...prev,res]);
                });
        }
    }, [contCount,electionNumber]);
    console.log(contestants);
    return (
        <section className="flex flex-wrap h-[75vh] items-end justify-center">
            <div className="carousel carousel-center max-w-fit p-10 space-x-4 bg-neutral rounded-box">
                {
                    contestants.map((data, index) => {
                        // console.log(data);
                        return (
                            <div key={index} className="carousel-item">
                                <Card aadhar={aadhar} phase={phase} hasVoted={hasVoted} setHasVoted={setHasVoted} data={data} election={election} web3={web3} index={index} />
                            </div> 
                        );
                    })
                }
            </div>
        </section>
    );
};

export default Voting;