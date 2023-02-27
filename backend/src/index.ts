import { gql } from "./graphql/gql";

// Import the KV namespace object
declare const links: KVNamespace;

export default {
  fetch: gql.fetch,

};

// // Define a function to get a value from KV
// async function getValue(key: string): Promise<string | null> {
//   try {
//     const value = await links.get(key);
//     return value === null ? null : value;
//   } catch (err) {
//     console.error(`KV get failed for key "${key}":`, err);
//     return null;
//   }
// }

// // Define a function to set a value in KV
// async function setValue(key: string, value: string): Promise<boolean> {
//   try {
//     await links.put(key, value, { expirationTtl: 60 });
//     return true;
//   } catch (err) {
//     console.error(`KV put failed for key "${key}" and value "${value}":`, err);
//     return false;
//   }
// }

// export { getValue, setValue };