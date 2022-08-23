import Link from 'next/link'
import Image from 'next/image'
import LirnLogo from '../public/LirnLogo.png'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ClientOnly from "../comps/ClientOnly";
import React, { useEffect, useState } from 'react';

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

const Navbar = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [userAddress, setUserAddress] = useState(null);
  useEffect(() => setUserAddress(address, []));

  return (
    <div className="topBar">
      
      <a href="/">
        <div className="logo">
          <div className="logoImage">
            <Image layout="fixed" width={70} height={70} src={LirnLogo} />
          </div>
          <p className="logoText"> Lirn.io </p>
        </div>
      </a>
      
      <div className="linkBar">
        <Link href="/explore">
          <div className="links"> Explore </div>
        </Link>
        <Link href="/educators">
          <div className="links"> Educators </div>
        </Link>
        {userAddress ? (
          <Link href="/profile">
            <div className="links"> Profile </div>
          </Link>
        ) : (
          <div className="connectButton">
            <ConnectButton />
          </div>)}

      </div>
    </div>
  );
}

export default Navbar;
