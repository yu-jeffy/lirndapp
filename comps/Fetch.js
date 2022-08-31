// COMPONENT WITH FUNCTION TO FETCH NTTS
// CURRENTLY NOT IN USE, BUT FILE SAVED IN BUILD FOR REFERENCE
// REMOVE IN PRODUCTION

import * as React from 'react';
import soulboundv1 from '../public/soulboundv1.json';
import { ethers } from "ethers";
import {
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
} from "wagmi";

const contractAbi = new ethers.utils.Interface(soulboundv1);

const NTTCount = 20;

export function Fetch() {
    const { address, isConnecting, isDisconnected } = useAccount();

    // Calls the  function "balanceOf" on SC
    function checkNTTs() {
        let userNTTs = [];
        for (let i = 0; i <= NTTCount; i++) {
            let readArgs = i + "";
            const { data, isError, isLoading } = useContractRead({
                addressOrName: '0x0b618F71d2a9f7EA915eC8dDA558dD1a0F39156c',
                contractInterface: contractAbi,
                functionName: 'balanceOf',
                args: [address, readArgs],
            })
            if (Number(data) > 0) {
                userNTTs.push(i);
            }
        }
        return userNTTs;
    }

    let ownedNTTids = checkNTTs();
    let ownedNTTlinks = [];
    for (let i=0; i<ownedNTTids.length; i++){
        ownedNTTlinks.push("https://opensea.io/assets/matic/0x0b618f71d2a9f7ea915ec8dda558dd1a0f39156c/" + ownedNTTids[i]);
    }

    return (
        <div>
            Owned NTTs: <br/>
            Token IDs: {ownedNTTids}<br/>
            Token Links: {ownedNTTlinks}
        </div>
    )
}