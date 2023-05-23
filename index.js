import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";

import typeDefs from "./Schema.js/typeDefs.js";
import resolvers from "./Schema.js/Resolvers.js";
import { MONGODB_URl } from "./config.js";





const server= new ApolloServer({
    typeDefs,
    resolvers
})
mongoose.connect(MONGODB_URl, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Mongodb Is Connected")
    return  startStandaloneServer (server,{
        listen:{
            port:5000
        }
    })
}).then((res)=>{
    console.log(`Server running at ${res.url}`)
}).catch ((error)=>{
    console.log(error.message);
});



// startStandaloneServer(server,{
//     listen:{port:4000}
// }).then(({url})=>{
//     console.log(`Server running at${url}`);
// })