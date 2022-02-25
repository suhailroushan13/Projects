import readlineSync from "readline-sync";
import color from "colors-cli";
import fs from "fs/promises";
import rsa from "js-crypto-rsa";
import encrypt from "./encrypt.js";

async function Decryption() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.x124("\t\tDECRYPTION\t\t"));
    console.log("+------------------------------------------+");

    let option = readlineSync.question("Enter the Encrypted Data : ");

  let privateKey = await fs.readFile("private.key");
  privateKey = JSON.parse(privateKey);
  await rsa.decrypt(
      encyptedData,
      privateKey,
      "SHA-256" // optional, for OAEP. default is 'SHA-256'
    );
    console.log(decryptedData);


  } catch (error) {
    console.log(error);
  }
}

function arrayToString(bufferValue) {
  return new TextDecoder("utf-8").decode(bufferValue);
}

export default Decryption;
