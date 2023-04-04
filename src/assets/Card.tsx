import React from "react";
import BJP from './images/BJP.png';
import INC from './images/INC.png';
import AAP from './images/AAP.png';
import TMC from './images/TMC.png';
import Independent from './images/eci-logo.png';
import Others from './images/eci-logo.png';

const Card = ({ aadhar,phase,hasVoted,setHasVoted,data,election,web3,index }: any) => {
    const vote = async () => {
        const accounts = await web3.eth.getAccounts();
        await election.methods.vote(index+1, web3.utils.sha3(aadhar)).send({ from: accounts[0] });
        setHasVoted(true);
        window.location.reload();
    }
    // console.log(data);
    return (
        <div className="card w-96 glass">
            <figure className="p-5">
                <img src={BJP} alt="" className={`${data[2] === 'BJP' ? 'block' : 'hidden'} h-32`} />
                <img src={INC} alt="" className={`${data[2] === 'INC' ? 'block' : 'hidden'} h-32`} />
                <img src={AAP} alt="" className={`${data[2] === 'AAP' ? 'block' : 'hidden'} h-32`} />
                <img src={TMC} alt="" className={`${data[2] === 'TMC' ? 'block' : 'hidden'} h-32`} />
                <img src={Independent} alt="" className={`${data[2] === 'Independent' ? 'block' : 'hidden'} h-32`} />
                <img src={Others} alt="" className={`${data[2] === 'Others' ? 'block' : 'hidden'} h-32`} />
            </figure>
            <div className="card-body flex flex-row text-white">
                <div className="flex flex-col w-1/2 justify-start">
                    <h2 className="card-title">{data[0]}</h2>
                    <p>Age - {data[3]}</p>
                    <p>Qualification - {data[4]}</p>
                    <p className={`${phase === 2 ? 'block' : 'hidden'}`}>Votes - {data[1]}</p>
                </div>
                <div className={`card-actions w-1/2 flex items-center justify-end ${phase === 2 ? 'hidden' : 'block'}`}>
                    <button className={`btn btn-primary ${phase === 2 ? 'btn-disabled hidden' : 'btn-active block'} ${hasVoted ? 'btn-disabled btn-ghost' : 'btn-active'}`} onClick={vote}>Vote</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
