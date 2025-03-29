import { Account, Client, Databases } from "react-native-appwrite";

export const appWrite = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e7a80d001d8f41da47")
  .setPlatform("com.thoulee.chatboy");

export const account = new Account(appWrite);
export const databases = new Databases(appWrite);
