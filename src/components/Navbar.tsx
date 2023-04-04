/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ECI from '../assets/images/eci-logo.png';


const NavBar = ({ aadhar,isLogged,setIsLogged,phase,setPhase, election, web3,admin }: any) => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        web3.eth.getAccounts()
            .then((res: any) => {
                setAccounts(res);
            });
    },[accounts]);

    const handleClick:(setPhase: React.Dispatch<React.SetStateAction<number>>) => Promise<void> = async (setPhase:React.Dispatch<React.SetStateAction<number>>) => {
        // const accounts = await web3.eth.getAccounts();
        if (phase === 3) {
            await election.methods.changeState(0).send({ from: accounts[0] });
            setPhase(0);
        } else if(phase === 2) {
            await election.methods.reset().send({ from: accounts[0] });
            setPhase(3);
        } else if(phase === 1) {
            await election.methods.getResults().send({ from: accounts[0] });
            setPhase(2);
        } else {
            await election.methods.changeState(1).send({ from: accounts[0] });
            setPhase(1);
        }
        window.location.reload();
    };

    return (
        <section className="sticky top-0 z-50">
            <div className='navbar bg-red-500 h-40'>
                <div className="navbar-start">
                    <a href='https://eci.gov.in/' target='blank' className="btn btn-ghost h-32"><img src={ECI} alt="" /></a>
                </div>
                <div className={`navbar-end ${isLogged ? null : 'hidden'}`}>
                    <p className='text-white text-lg mr-5'>Welcome <b className='text-blue-900'>{admin !== accounts[0] ? 'user' : 'admin'}@{aadhar}</b></p>
                    <button className={`btn ${(admin !== accounts[0]) ? 'hidden btn-disabled ' : 'btn-active block'}`} onClick={() => handleClick(setPhase)}>{(phase === 3) ? 'Start' : (phase === 2) ? 'Reset' : 'Next Phase'}</button>
                    <button className='btn mx-5' onClick={() => { setIsLogged(false); sessionStorage.setItem('isLogged', 'false'); }}>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default NavBar;