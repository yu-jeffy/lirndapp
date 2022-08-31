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

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Footer Component
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const Footer = () => {

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // Render the component for the user
  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  return (
    <div className="bottomBar">
      <div className="footerContainer">
        <div className="footerLeft">
          <Image layout="fixed" width={70} height={70} src={LirnLogo} />
          <p className="footerLogoText"> Lirn.io </p>
        </div>
        <div className="footerRight1">
          <h4>Explore</h4>
          <Link href="/"><a className="footerLink">All Assessments</a></Link><br/>
          <Link href="/"><a className="footerLink">Web3</a></Link><br/>
          <Link href="/"><a className="footerLink">Programming</a></Link><br/>
          <Link href="/"><a className="footerLink">Marketing</a></Link><br/>
        </div>
        <div className="footerRight2">
          <h4>Account</h4>
          <Link href="/"><a className="footerLink">My Profile</a></Link><br/>
          <Link href="/"><a className="footerLink">Knowledge Creation</a></Link><br/>
          <Link href="/"><a className="footerLink">Saved for Later</a></Link><br/>
          <Link href="/"><a className="footerLink">Settings</a></Link><br/>
        </div>
        <div className="footerRight3">
          <h4>Resources</h4>
          <Link href="/"><a className="footerLink">FAQs</a></Link><br/>
          <Link href="/"><a className="footerLink">Help Center</a></Link><br/>
          <Link href="/"><a className="footerLink">Blog</a></Link><br/>
          <Link href="/"><a className="footerLink">Partners</a></Link><br/>
          <Link href="/"><a className="footerLink">For Learners</a></Link><br/>
          <Link href="/"><a className="footerLink">For Educators</a></Link><br/>
        </div>
        <div className="footerRight4">
          <h4>Company</h4>
          <Link href="/"><a className="footerLink">About</a></Link><br/>
          <Link href="/"><a className="footerLink">Mission</a></Link><br/>
          <Link href="/"><a className="footerLink">Contact</a></Link><br/>
        </div>
        <div className="footerTechnical">
          <div className="footerTechnicalLeft">2022 Lirn.io</div>
          <div className="footerTechnicalRight">
            <Link href="/privacy"><a className="footerTechnicalRightLink">Privacy Policy</a></Link>
            <Link href="/terms"><a className="footerTechnicalRightLink">Terms of Service</a></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;


