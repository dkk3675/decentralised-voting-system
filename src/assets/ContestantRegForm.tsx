/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { contractTS } from "../interfaces/pages";

interface Contestant{
    contestantData?: {
        aadhar: string | null;
        name: string;
        party: string;
        age: number;
        qualification: string;
    }
    setContestantData: React.Dispatch<React.SetStateAction<{
        aadhar: string;
        name: string;
        party: string;
        age: number;
        qualification: string;
    }>>
}

const ContestantRegForm = ({ aadhar,setPhase, election,web3,isNotRegistered,setIsNotRegistered,admin }: any) => {
    const [contestantData, setContestantData] = useState<Contestant['contestantData']>({
        aadhar: web3.utils.sha3(aadhar),
        name: '',
        party: '',
        age: 0,
        qualification: '',
    });
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        web3.eth.getAccounts().then((res: any) => setAccounts(res));
    },[accounts])
    const contestReg: React.FormEventHandler<HTMLFormElement> = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(contestantData,accounts);
        const res = await election.methods.addContestant(contestantData?.aadhar,contestantData?.name,contestantData?.party,contestantData?.age,contestantData?.qualification).send({ from: accounts[0],value: web3.utils.toWei('0.1','ether') });
        console.log(res);
        setContestantData({
            aadhar: web3.utils.sha3(aadhar),
            name: '',
            party: '',
            age: 0,
            qualification: '',
        });
        window.location.reload();
        // setIsNotRegistered(false);
    }
    return (
        <section>
            <form onSubmit={(e) => contestReg(e)}>
                <div className="form-control">
                    <label className="input-group mb-5">
                        <span>Full Name&nbsp;<b className="text-red-900">*</b></span>
                        <input onChange={(e) => setContestantData({ ...contestantData, name: (e.target as HTMLInputElement).value })} type="text" placeholder="Akhil Kumar" className="input input-bordered" required />
                    </label>
                    <label className="input-group mb-5">
                        <span>Abbr. Party Name&nbsp;<b className="text-red-900">*</b></span>
                        <select onChange={(e) => setContestantData({ ...contestantData, party: (e.target as HTMLSelectElement).value })} className="input input-bordered" required defaultValue={0}>
                            <option disabled value={0}>-------select-------</option>
                            <option value="BJP">BJP</option>
                            <option value="INC">INC</option>
                            <option value="AAP">AAP</option>
                            <option value="TMC">TMC</option>
                            <option value="Independent">Independent</option>
                            <option value="Others">Others</option>
                        </select>
                    </label>
                    <label className="input-group mb-5">
                        <span>Age&nbsp;<b className="text-red-900">*</b></span>
                        <input onChange={(e) => setContestantData({ ...contestantData, age: Number((e.target as HTMLInputElement).value) })} type="number" placeholder="48" className="input input-bordered" required min={25} />
                    </label>
                    <label className="input-group mb-5">
                        <span>Qualification&nbsp;<b className="text-red-900">*</b></span>
                        <input onChange={(e) => setContestantData({ ...contestantData, qualification: (e.target as HTMLInputElement).value })} type="text" placeholder="M.Phil." className="input input-bordered" required />
                    </label>
                </div>
                <button type="submit" className={`btn btn-primary mt-5 ${isNotRegistered ? 'btn-active' : 'btn-disabled' }`}>Register</button>
            </form>
        </section>
    );
};

export default ContestantRegForm;