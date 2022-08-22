import clientPromise from '../../lib/mongodb'

export default async function handler(req, res){
    const client = await clientPromise;
    const NTTDB = client.db("NTTs");

    const countCollection = NTTDB.collection("Count");

    const count = await countCollection.findOne({ type: "count" });
    
    res.json(count);
}