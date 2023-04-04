/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import Registration from './Registration';
import Voting from './Voting';
import Results from './Results';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Error from './Error';


export const Home = ({ aadhar,isLogged,setIsLogged,phase, setPhase, election, web3, admin }: any) => {
    const [isNotRegistered, setIsNotRegistered] = useState<boolean>(true);
    useEffect(() => {
        election.methods.search(web3.utils.sha3(aadhar)).call()
            .then((res: any) => {
                // console.log(res);
                setIsNotRegistered(res);
            });
    },[isNotRegistered]);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    useEffect(() => {
        election.methods.hasVoted(web3.utils.sha3(aadhar)).call()
            .then((res: any) => {
                // console.log(res);
                setHasVoted(res);
            });
    },[hasVoted]);
    // console.log(phase,isNotRegistered);
    // console.log(typeof (phase))
    // console.log(typeof(3))
    return (
        <section>
            {
                (phase !== 3)
                ?
                (
                    <div>
                        <div className="tabs font-bold bg-white w-screen h-12 fixed z-50">
                            <button className={`tab tab-bordered w-[31vw] text-lg mx-3 ${phase === 0 ? 'tab-active' : 'tab-disabled'}`}>Registration<FontAwesomeIcon icon={faCheckCircle} className={`text-green-600 ml-2 ${!isNotRegistered ? 'block' :'hidden'}`} /><FontAwesomeIcon icon={faTimesCircle} className={`text-red-600 ml-2 ${phase !== 0 && isNotRegistered ? 'block' :'hidden'}`} /></button>
                            <button className={`tab tab-bordered w-[31vw] text-lg mx-3 ${phase === 1 ? 'tab-active' : 'tab-disabled'}`}>Voting<FontAwesomeIcon icon={faCheckCircle} className={`text-green-600 ml-2 ${hasVoted ? 'block' :'hidden'}`} /><FontAwesomeIcon icon={faTimesCircle} className={`text-red-600 ml-2 ${phase === 2 && !hasVoted ? 'block' :'hidden'}`} /></button>
                            <button className={`tab tab-bordered w-[31vw] text-lg mx-3 ${phase === 2 ? 'tab-active' : 'tab-disabled'}`}>Results<FontAwesomeIcon icon={faCheckCircle} className={`text-green-600 ml-2 ${phase === 2 ? 'block' :'hidden'}`} /></button>
                        </div>
                            <div className='h-96'>
                                {(phase === 0) ? (<Registration aadhar={aadhar} phase={phase} setPhase={setPhase} election={election} web3={web3} isNotRegistered={isNotRegistered} setIsNotRegistered={setIsNotRegistered} admin={admin} />) : (phase === 1) ? (<Voting aadhar={aadhar} phase={1} setPhase={setPhase} hasVoted={hasVoted} setHasVoted={setHasVoted} election={election} web3={web3} />) : (phase === 2) ? (<Results phase={2} setPhase={setPhase} election={election} web3={web3} />) : (<Error phase={phase} setPhase={setPhase}  />)}   
                        </div>
                    </div>
                )
                    : (<Error phase={phase} setPhase={setPhase} />)
            }
        </section>
    );
};