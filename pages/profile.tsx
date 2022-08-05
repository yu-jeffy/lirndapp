import { useRouter } from 'next/router';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image';

import {
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
  } from "wagmi";
  import { ethers } from "ethers";

const Profile: NextPage = () => {
    
    const { address, isConnecting, isDisconnected } = useAccount();



    return (
        <div className="profileContainer">
            <header className="AppHeader">
                <h1> Profile </h1>
            </header>
            <body>
             Address: {address}
            </body>
      </div>
    );
  };
  
  export default Profile;
  