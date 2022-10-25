import { JSHash, CONSTANTS } from "react-native-hash";
import { get, ref, child } from "firebase/database";
import { db } from "../../firebaseConfig";
const dbRef = ref(db);

export async function CheckEmail(email) {
  const result = await get(child(dbRef, `users/${email}`));
  return result.exists();
}

export async function GetHash(str) {
  return await JSHash(str, CONSTANTS.HashAlgorithms.sha256);
}
