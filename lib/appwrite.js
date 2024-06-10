import { Client, Account } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.amanfang.aora",
  projectId: "6666cae20016b6320f0e",
  databaseId: "6666ce99000e90652f5d",
  usersCollectionId: "6666ceed003a06103f93",
  videosCollectionId: "6666cf9b001e5a2be843",
  storageId: "6666d19a001facf752c9",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
