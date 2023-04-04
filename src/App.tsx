/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import NavBar from './components/Navbar';
import { Home } from './components/Home';
import Footer from './components/Footer';
import { setPage } from './interfaces/pages';
import { address, abi } from "./assets/contract";
import Web3 from "web3";
import Login from './components/Login';

declare let window: any;

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [aadhar, setAadhar] = useState('------------');
  const [phase, setPhase] = useState<number>(3);
  const [admin, setAdmin] = useState('');
  // const [web3, setWeb3] = useState(null);
  // const [contract, setContract] = useState(null);
  let web3: any;
  let contract: any;
  if (window.ethereum) {
    // window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    if (web3) {
      contract = new web3.eth.Contract(abi, address);
    }
  }
  useEffect(() => {
        if (sessionStorage.getItem('isLogged') === 'true') {
          setIsLogged(true);
        }
        if (sessionStorage.getItem('aadhar') !== '------------') {
          let a:any = sessionStorage.getItem('aadhar');
          setAadhar(a);
        }
    if (contract) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      contract.methods.admin().call()
        .then((res: string) => {
          setAdmin(res);
        });
    }
    },[admin]);
  
  useEffect(() => {
    if (contract) {
      contract.methods.state().call()
        .then((res: setPage['phase']) => {
          setPhase(Number(res));
          // console.log(typeof(Number(res)),res);
        });
    }
  },[phase]);
  return (
    <section className="App">
      <NavBar aadhar={aadhar} isLogged={isLogged} setIsLogged={setIsLogged} phase={phase} setPhase={setPhase} election={contract} web3={web3} admin={admin} />
      {
        (isLogged) ? (
        (window.ethereum)
      ?
          (<Home aadhar={aadhar} isLogged={isLogged} setIsLogged={setIsLogged} phase={phase} setPhase={setPhase} election={contract} web3={web3} admin={admin} />)
      :
          (<div className="flex flex-wrap h-[75vh] items-center justify-center">
            <h1>Kindly install Metamask extension in your browser.</h1>
            </div>)) :
          (<Login setAadhar={setAadhar} isLogged={isLogged} setIsLogged={setIsLogged} />)
      }
      <Footer />
    </section>
  );
}

export default App;
