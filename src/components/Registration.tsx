import React from "react";
import ContestantRegForm from "../assets/ContestantRegForm";


const Registration = ({ aadhar,phase,setPhase, election, web3, isNotRegistered,setIsNotRegistered,admin }: any) => {
    const voterReg:(setIsNotRegistered: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void> = async (setIsNotRegistered:React.Dispatch<React.SetStateAction<boolean>>) => {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await election.methods.voterRegistration(web3.utils.sha3(aadhar)).send({ from: accounts[0] });
        // console.log(res);
        setIsNotRegistered(false);
    }
    return (
        <section>
            <div className="flex flex-col h-screen bg-base-200 lg:flex-row">
                <div className="grid flex-grow card rounded-box place-content-center">
                    <h1 className="text-3xl font-bold pb-20">Contestant Registration</h1>
                    <ContestantRegForm aadhar={aadhar} phase={phase} setPhase={setPhase} election={election} web3={web3} isNotRegistered={isNotRegistered} setIsNotRegistered={setIsNotRegistered} admin={admin} />
                </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className="grid flex-grow card rounded-box place-content-center">
                    <h1 className="text-3xl font-bold pb-20">Voter Registration</h1>
                    <button type="submit" className={`btn btn-primary mt-5 ${isNotRegistered ? 'btn-active' : 'btn-disabled'}`} onClick={() => voterReg(setIsNotRegistered)}>Click to Register</button>
                </div>
            </div>
        </section>
    );
};

export default Registration;