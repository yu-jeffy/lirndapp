import { useRouter } from 'next/router'
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image'
import TestFrame from '../public/TestFrame.png'

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

const Home: NextPage = () => {
  return (
    <div className="homeContainer">
      <header className="AppHeader">
      </header>
      <div className="homeLeft">
        <b> Text here </b> <br/>
        More text here
      </div>
      <div className="homeRight">
        <Image src={TestFrame}/>
      </div>
    </div>
  );
};

export default Home;
