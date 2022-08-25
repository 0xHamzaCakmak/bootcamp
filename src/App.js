import './App.css';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRandomUser } from './hooks/useRandomUser';

function App() {
const [account, setAccount] =useState("");
const [provider, setProvider] = useState(null);

useRandomUser();

  function connect() {
    if(!window.ethereum) {alert ("Metamask is not installed");return;}
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    provider
    .send("eth_requestAccounts", [])
    .then(accounts=>setAccount(accounts[0]))
    .catch((err)=>console.log(err));

    const signer = provider.getSigner();
    console.log(signer);
    
    //cüzdandan yapılan tüm transferlerin countunu verir
     signer.getTransactionCount().then((count)=>console.log(count));
    
  }
  
  return (
    <div className="App">
        
       
    <button onClick={()=>{
      if(account) return;
      connect();
    }}> {account ? "Connected" : "Connect"} </button>

    <div> account: {account}</div>

    </div>
  );
}

export default App;
