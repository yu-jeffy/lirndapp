// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Imports / Libraries
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import { useRouter } from 'next/router';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image';
import ClientOnly from "../comps/ClientOnly";
import { ethers } from "ethers";
import soulboundv1 from '../public/soulboundv1.json';
import { MongoClient } from 'mongodb';
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Variables / Constants
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ABI for Smart Contract
const contractAbi = new ethers.utils.Interface(soulboundv1);



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Server Side (Runs before page loads for user)
// Connects to MongoDB, queries Metadata, and stores in a variable to be used on page
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export async function getServerSideProps() {
  try {
    const countClient = await clientPromise;

    // Get NTTCount from DB
    const countJSON = await countClient.db("NTTs").collection("Count").findOne({ type: "count" });
    const count = JSON.parse(JSON.stringify(countJSON));

    // Get NTT Metadata from DB
    const metadataJSON = await countClient.db("NTTs").collection("Metadata").find({}).toArray();
    const metadata = JSON.parse(JSON.stringify(metadataJSON));

    return {
      props: {
        isConnected: true,
        NTTCount: count,
        NTTMetadata: metadata,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Profile Page
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default function Profile({
  isConnected, NTTCount, NTTMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // Gets connected wallet address
  const { address, isConnecting, isDisconnected } = useAccount();

  // Get the NTTCount value from document in MongoDB and use as the list of NTTs to check if owned
  // Query path: NTTs -> Count -> document
  let totalNTTs = NTTCount.nttCount;

  // Queries the Smart Contract to see which NTTs the logged-in address owns
  // Returns an array of Token IDs that are owned by the logged-in address
  function useCheckNTTs() {
    let userNTTs = [];
    for (let i = 1; i <= totalNTTs; i++) {
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

  // Array of Token IDs that are owned by the logged-in address
  let ownedNTTids = useCheckNTTs();

  // Array of Metadata of tokens owned by the logged-in address
  // Produced by filtering all the Metadata fetched by the Server Side loading by token IDs in "ownedNTTids" variable
  let filteredMetadata = [];
  for (let i = 0; i < NTTMetadata.length; i++) {
    if (ownedNTTids.includes(NTTMetadata[i].tokenId)) {
      filteredMetadata.push(NTTMetadata[i]);
    }

  }


  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // Render the page for the user
  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  return (
    <div className="profileContainer">
      <div className="profileLeft">
        <div className="profileCard">
          <ClientOnly>
            {address ? (
              <span>You are Logged In <br />
                Address: {address} <br /></span>
            ) : (
              <span>Not Logged In<br /></span>)}

            <br />
            Owned NTTs (by ID): {ownedNTTids}

          </ClientOnly>
        </div>
        <div className="profileBio">
          Bio
        </div>
        <div className="profileSocials">
          Socials
        </div>

      </div>
      <div className="profileRight">
        <div className="profileBanner">
          <span className="profileBanner1">&#128075; Hey, Lirner!</span> <br />
          <span className="profileBanner2">Looks like you got a new nice knowledge collection going on. Great work!</span> <br />
          <Link href="/explore">
            <div className="profileBanner3">Explore Content</div>
          </Link>
        </div>
        <h2> My Earned Knowledge</h2>
        <div className="profileOwned">
          <ClientOnly>
            {
              filteredMetadata.map((metadata, i) => (
                <div key={i} className="profileNTT">
                  <Image
                    alt="Loading Image ..."
                    layout="responsive"
                    width={10}
                    height={10}
                    src={"https://api.lirn.io/ipfs/" + metadata.image.slice(7)} />
                  <h2 className="profileNTTname">{metadata.name}</h2>
                  <p className="profileNTTdesc">{metadata.description}</p>
                </div>
              ))
            }
            <br />
          </ClientOnly>
        </div>


      </div>


      {isConnected ? (
        <h2>You are connected to MongoDB</h2>
      ) : (
        <h2>
          You are NOT connected to MongoDB.
        </h2>
      )}
    </div>
  );
};

