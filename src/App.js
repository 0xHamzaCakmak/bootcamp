import './App.css';
import { BigNumber, ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//import { useRandomUser } from './hooks/useRandomUser';
import { useLockContract} from './hooks/useLockContract';

function App() {
const [account, setAccount] =useState("");
const [provider, setProvider] = useState(null);
const [madres, setMadres] =useState("");
const [totalLockedAmount, setTotalLockedAmount] = useState(BigNumber.from(0));
const [value, setValue]= useState ("");


const lockContract=useLockContract();

const lock = async () => {
await lockContract.lockTokens();
};

const getTotalLocked = async () => {
  if(!lockContract) return;
 const result =  await lockContract.totalLocked();
 setTotalLockedAmount(result);
};


/* userandomuse js e bağlantı yapan kodlar.
  const {state}= useRandomUser();
  const renderEmail= useMemo (()=>{
  if(!state) return null;
  return state.email;
 },[state]) */

  function connect() {
    if(!window.ethereum) {
      alert ("Metamask is not installed");
      return;
    }

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
     //signer ile bağlı olan cüzdan adresini verir
     signer.getAddress().then((addres)=>setMadres(addres));

    
  }
  
  return (
    <div className="App">
        
       
      <button onClick={()=>{
        if(account) return;
        connect();
      }}> {account ? "Connected" : "Connect"} </button>

      <div> account: {account}</div>
      <div> Signer account: {madres}</div>
      {/* 
      api ile mail görüntülemek için açıklamadan çıkart
      <h1>{renderEmail}</h1> 
      */}

      <button onClick={getTotalLocked}> Get Total Locked</button>


      {/*ethers içerisinden formatether fonksiyonu ile 
      bignumber olan değeri sayısal olarak döndürüyor */}
      <h1> Get Total Lock Amount : {ethers.utils.formatEther(totalLockedAmount)}</h1>
      {/* burada ise virgülden sonra kac decimal ile gösterilmesi gerektiğine dair dönüşüm
      eğer decilaml değeri yazılmaz ise default decimali alır */}
      <h1> Get Total Lock Amount : {ethers.utils.formatUnits(totalLockedAmount , 5)}</h1>

      <input 
        placeholder='Enter Value'
        value={value} 
        onChange={(e)=>setValue(e.target.value)}
      />
      <button onClick={lock}>Lock Token</button>

    </div>
  );
}

export default App;
