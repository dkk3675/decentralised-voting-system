/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from "react";
import Card from "../assets/Card";
import { setPage } from "../interfaces/pages";

const Results = ({ phase, election, web3 }: any) => {
    const [electionNumber, setElectionNumber] = useState();
    const [detailCount, setDetailCount] = useState(0);
    const [allWinners, setAllWinners] = useState([]);
    const [totalReg, setTotalReg] = useState(0);
    const [totalCont, setTotalCont] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);
    const [percent, setPercent] = useState(0.00);
    useEffect(() => {
        election.methods.electionNumber().call().then((res: any) => setElectionNumber(Number(res)));
        election.methods.detailCount().call().then((res: any) => setDetailCount(res))
        for (let i = 0; i < detailCount; i++){
            election.methods.details(electionNumber,i).call().then((res: any) => setAllWinners((prev) => [...prev,res]));
        }
    },[detailCount,electionNumber])
    useEffect(() => {
        election.methods.voterCount().call().then((res: any) => setTotalReg(res));
        election.methods.contestantCount().call().then((res: any) => setTotalCont(res));
        election.methods.totalVotes().call().then((res: any) => setTotalVotes(res));
        setPercent(parseFloat((totalVotes*100/totalReg).toFixed(2)));
    },[totalReg,totalCont,totalVotes])
    return (
        <section className="flex flex-col h-screen lg:flex-row items-center">
            <div className="grid flex-grow card rounded-box place-items-center">
                <h1 className="text-3xl font-bold mb-10">Winner</h1>
                <div className="carousel carousel-center max-w-fit p-10 space-x-4 bg-neutral rounded-box">
                    {
                        allWinners.map((data, index) => {
                            // console.log(data);
                            return (
                                <div key={index} className="carousel-item">
                                    <Card phase={phase} data={data} />
                                </div> 
                            );
                        })
                    }
                </div>
            </div>
            <div className="grid flex-grow card rounded-box place-items-center">
                <h1 className="text-3xl font-bold mb-10">Stats</h1>
                <div className="stats stats-vertical shadow bg-base-300">
                    <div className="stat">
                        <div className="stat-title">Registrations</div>
                        <div className="stat-value">{totalReg}</div>
                        <div className="stat-desc">Contestants = {totalCont}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Votes</div>
                        <div className="stat-value">{totalVotes}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Voter Turnout</div>
                        <div className="stat-value">{percent.toFixed(2)}%</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;