import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import TestFrame from '../public/TestFrame.png';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from 'next/link'
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

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Home Page
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const Home: NextPage = () => {

  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // Render the page for the user
  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  return (
    <div className="homeContainer">
      <div className="homeTitle">
        Learn. Verify. Showcase.
        <p className="homeTitleSub">Lirn is the home for all autodidacts that learn online. <br />
          Now, you can verify your knowledge with Non-Transferable Tokens.<br />
          <a href="ntts" className="homeTitleLink">Learn more about NTTs &#128279;</a>
        </p>

      </div>
      <div className="homeGrid" id="homeGrid">
        <div className="home1a">How does it work?</div>
        <div className="home1b">
          <div className="home1c">
            <img className="home1cIcon" src="search.png" /> <br />
            <span className="home1cTitle">Search For Topic Of Interest</span>
            <p className="home1cText">Go ahead and explore the library and choose a topic of interest. Once you feel ready, go ahead and take the assessment.</p>
          </div>
          <div className="home1c">
            <img className="home1cIcon" src="wallet.png" /> <br />
            <span className="home1cTitle">Connect Your Wallet</span>
            <p className="home1cText">First things first, connect your wallet in the top right corner. Don’t have a wallet just yet? Follow the steps here to get you started.</p>
          </div>
          <div className="home1c">
            <img className="home1cIcon" src="assessment.png" /> <br />
            <span className="home1cTitle">Take Assessment</span>
            <p className="home1cText">The time has come: time to prove your knowledge. Go through the assessment and test yourself on the topic you chose.</p>
          </div>
          <div className="home1c">
            <img className="home1cIcon" src="checkmark.png" /> <br />
            <span className="home1cTitle">Verify Your Knowledge</span>
            <p className="home1cText">Pass the assessment? Congrats! you have now learned ad truly verified your knowledge. Share your NTT with the world!</p>
          </div>
        </div>
        <div className="home2a">Ready To Learn and Earn?</div>
        <div className="home2b">
          <div className="home2bText">View our most<br />popular assessments.</div>
          <Link href="/explore">
            <div className="home2bButton">Search For Topics</div>
          </Link>
        </div>
        <div className="home3a">Have Knowledge To Share?</div>
        <div className="home3b">
          <Link href="/educators">
            <div className="home3bButton">Become An Educator</div>
          </Link>
          <div className="home3bText">Teach the world<br />what you know.</div>
        </div>
        <div className="homeMission">
          <div className="homeMissionText"></div>
          <div className="homeMissionVideo">
            <video src=""></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
