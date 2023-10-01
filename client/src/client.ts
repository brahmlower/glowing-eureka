import { Client } from "@heroiclabs/nakama-js";

const useSSL = false; // Enable if server is run with an SSL certificate.
const client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

// (window as any).client = client;

export default client;
