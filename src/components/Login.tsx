import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAadhar,isLogged,setIsLogged }:any) => {
  let phone: any;
  const [status, setStatus] = useState('');
  const [userData, setUserData] = useState({ aadhar:'', mobNo:'' });
  const handleClick = () => {
    setStatus('');
    const encodedParams = new URLSearchParams();
    encodedParams.append("txn_id", "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8");
    encodedParams.append("consent", "Y");
    encodedParams.append("uidnumber", userData.aadhar);
    encodedParams.append("clientid", "222");
    encodedParams.append("method", "uidvalidatev2");

    const options = {
      method: 'POST',
      url: 'https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'verifyaadhaarnumber.p.rapidapi.com'
      },
      data: encodedParams
    };

    axios.request(options).then(function (response:any) {
      if (response.data.Succeeded) {
        phone = response.data.Succeeded.Uid_Details.Data.maskedMobileNumber;
        phone = phone.slice(phone.length - 3, phone.length);
        if (phone === userData.mobNo) {
          setStatus('Access Granted');
          setIsLogged(true);
          setAadhar(userData.aadhar);
          sessionStorage.setItem('aadhar', userData.aadhar);
          sessionStorage.setItem('isLogged', 'true');
        } else {
          setStatus('Access Denied');
          setIsLogged(false);
        }
      } else {
        setStatus('Access Denied');
        setIsLogged(false);
      }
    }).catch(function (error: any) {
      setStatus('Server Error');
      console.error(error);
    });
    setUserData({ aadhar:'', mobNo:'' });
  }
    return (
        <section>
          <div className="hero min-h-[75vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3">
                <div className="card-body">
                  <h1 className="text-5xl font-bold mb-5">Login now!</h1>
                  <div className="form-control">
                  <input type="text" placeholder="Aadhar Number" className="input input-bordered mb-2" onChange={(e) => { setUserData({ ...userData, aadhar: e.target.value })}} value={userData.aadhar} maxLength={12} />
                  </div>
                  <div className="form-control">
                  <input type="password" placeholder="Last 3 Digits of Mobile Number" className="input input-bordered" onChange={(e) => { setUserData({ ...userData, mobNo: e.target.value }) }} value={userData.mobNo} maxLength={3} />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleClick}>Login</button>
                  </div>
                  <div className="form-control mt-4 place-items-center">
                    <h4 className={`font-bold ${(status === 'Access Granted' ? 'text-green-600' : 'text-red-600')}`}>{status}</h4>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </section>
    );
};

export default Login;
