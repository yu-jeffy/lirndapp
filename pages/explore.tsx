import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import ClientOnly from "../comps/ClientOnly";
import Image from 'next/image';

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
// Explore Page
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default function Explore({
  isConnected, NTTCount, NTTMetadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {




  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // Render the page for the user
  // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  return (
    <div className="exploreContainer">
      <ClientOnly>
        {
          NTTMetadata.map((metadata, i) => (
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

      There are {NTTCount.nttCount} NTT's available
      {
        NTTMetadata.map((metadata, i) => (
          <div key={i}>
            <p>{metadata.name}</p>
          </div>
        ))
      }
    </div>
  );
};
