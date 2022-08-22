import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import TestFrame from '../public/TestFrame.png';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dynamic from 'next/dynamic';
import ClientOnly from "../comps/ClientOnly";

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

const NoSSRHome = dynamic(() => import("../comps/Ripple"), { suspense: true });

const HomeAlt: NextPage = () => {

  return (
    <div className="homeContainer">
      <div className="homeTitle">
        Learn. Verify. Showcase.
        <p className="homeTitleSub">Lirn is the home for all autodidacts that learn online. <br />
          Now, you can verify your knowledge with Non-Transferable Tokens.<br />
          <a href="ntts" className="homeTitleLink">Learn more about NTTs &#128279;</a>
        </p>

      </div>
      <ClientOnly>
        <NoSSRHome />
      </ClientOnly>
    </div>
  );
};

export default HomeAlt;
