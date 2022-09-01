import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { LOCK_ADDRESS } from "../constants/addresses";
import { LOCK_ABI } from "../constants/abi";

//bu hooks ile akıllı contract verilerine her yerden ulaşabiliriz.
//export ile dışarıya açtık. kullanmak istediğimiz sayfaya burayı import etmek yeterli
export const useLockContract =() => {
    const [contract, setContract] = useState(null);
    
    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const _contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
        setContract(_contract);
    }, []);
    return contract;
};