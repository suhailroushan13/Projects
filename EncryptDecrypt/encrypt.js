import readlineSync from "readline-sync";
import color from "colors-cli";
import fs from "fs/promises";
import rsa from "js-crypto-rsa";

async function Encryption() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.x12("\t\tENCRYPTION\t\t"));
    console.log("+------------------------------------------+");

    let option = readlineSync.question("Enter the String : ");


    console.log(color.green(`\nEncrypted Data of String ${option} is :`));
     await fs.writeFile("data/users.txt",JSON.stringify(option))
    let publicKey = await fs.readFile("public.key");
    publicKey = JSON.parse(publicKey);

    let FileData = await fs.readFile("data/users.txt");
    FileData = stringToArray(FileData); // Non Encrypted Data

    let encryptedData = await rsa.encrypt(
      stringToArray(option), // Buffer Fomrat Unsigned 8
      publicKey, // Public Key
      "SHA-256" // optional, for OAEP. default is 'SHA-256'
    );

    await fs.writeFile("encrypted.txt", JSON.stringify(encryptedData));
    console.log(encryptedData);
  } catch (error) {
    console.log(error);
  }
}

function stringToArray(bufferString) {
  let uint8Array = new TextEncoder("utf-8").encode(bufferString);

  return uint8Array;
}

export default Encryption;
