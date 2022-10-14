import { JSHash, CONSTANTS } from "react-native-hash";

export async function GetMovieHash(title, actors) {
  const extractTextPattern = /(<([^>]+)>)/gi;
  const movieTitle = await title.replace(extractTextPattern, "");

  return JSHash(movieTitle + actors, CONSTANTS.HashAlgorithms.sha256);
}
