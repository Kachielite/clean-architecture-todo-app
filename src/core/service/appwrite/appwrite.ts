import {Account, Client, Databases} from 'appwrite';
import {ENDPOINT, PROJECT_ID} from "../../secrets/secrets";

const client = new Client();

if(PROJECT_ID && ENDPOINT) {
    client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);
}

export const account = new Account(client);
export const database =  new Databases(client);