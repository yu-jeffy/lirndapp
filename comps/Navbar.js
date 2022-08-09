import Link from 'next/link'
import Image from 'next/image'
import LirnLogo from '../public/LirnLogo.png'
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
  
  return (
    <div className="topBar">
      <a href="/">
        <div className="logo">
          <div className="logoImage">
            <Image layout="fixed" width={70} height={70} src={LirnLogo}/>
          </div>
          <p className="logoText"> Lirn.io </p>
        </div>
      </a>
      <div className="linkBar">
        <Link href="/explore">
          <a className="links"> Explore </a>
        </Link>
        <Link href="/leap">
          <a className="links"> LirnLeap </a>
        </Link>
        <Link href="/educators">
          <a className="links"> Educators </a>
        </Link>
        <Link href="/profile">
          <a className="links"> Profile </a>
        </Link>
      </div>
      <div className="connectButton">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
