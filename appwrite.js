import {Client, Databases} from "appwrite";

const client=new Client();
const DB_ID="67b17d900024194a954f";
const COLLECTION_ID="67b17d98003340101f3b";

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67b17cc6002548701856");


export const databases=new Databases(client);
export {client,DB_ID,COLLECTION_ID};

//project id : 67b17cc6002548701856
//db : 67b17d900024194a954f
//collection : 67b17d98003340101f3b