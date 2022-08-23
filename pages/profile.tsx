import { useRouter } from 'next/router';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Fetch } from "../comps/Fetch";
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


export async function getServerSideProps() {
  try {
    const countClient = await clientPromise;

    // Get NTTCount from DB
    const countJSON = await countClient.db("NTTs").collection("Count").findOne({ type: "count" });
    const count = JSON.parse(JSON.stringify(countJSON));

    // Get NTT Metadata from DB
    const metadataJSON = await countClient.db("NTTs").collection("Metadata").find({}).toArray();
    const metadata = JSON.parse(JSON.stringify(metadataJSON));



    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

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


// ABI for Smart Contract
const contractAbi = new ethers.utils.Interface(soulboundv1);



// note: need to get this from mongodb
// const NTTCount = 20;



export default function Profile({
  isConnected, NTTCount, NTTMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Gets wallet info
  const { address, isConnecting, isDisconnected } = useAccount();

  // Get the NTTCount value in the MongoDB and use as the list of NTTs to check if owned
  let totalNTTs = NTTCount.nttCount;

  // Queries the Smart Contract to see which NTTs the logged-in address owns
  // Returns an array of Token IDs that are owned by the logged-in address
  function checkNTTs() {
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

  // Variable of array of Token IDs that are owned by the logged-in address
  let ownedNTTids = checkNTTs();


  let filteredMetadata = [];
  for (let i = 0; i < NTTMetadata.length; i++) {
    if (ownedNTTids.includes(NTTMetadata[i].tokenId)) {
      filteredMetadata.push(NTTMetadata[i]);
    }

  }



  return (
    <div className="profileContainer">
      <div className="profileLeft">
        <div className="profileCard">
          <ClientOnly>
            {address ? (
              <span>You are Logged In <br />
                Address: {address} <br /><br /></span>
            ) : (
              <div className="connectButton">
                <ConnectButton />
              </div>)}

            Owned NTTs (by ID): {ownedNTTids}<br />

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

