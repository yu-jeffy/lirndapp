// NextAuth.js - Authentication Provider
// Dynamic route handler for NextAuth.js which contains all global NextAuth.js configurations

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Imports / Libraries
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Authentication
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
export default NextAuth({
    // For more information on each option (and a full list of options) go to
    // https://next-auth.js.org/configuration/options
    adapter: MongoDBAdapter(clientPromise),

  })



