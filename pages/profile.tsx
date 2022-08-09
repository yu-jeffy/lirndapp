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

      <div className="profileLeft">
        <div>
          Address: {address}
        </div>
      </div>
      <div className="profileRight">
        <div className="profileRightTitle">

        </div>
        <div className="profileNTTs">

        </div>
      </div>



    </div>
  );
};

export default Profile;
