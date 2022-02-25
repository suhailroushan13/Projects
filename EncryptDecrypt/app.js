import readlineSync from "readline-sync";
import rsa from "js-crypto-rsa";
import fs from "fs/promises";
import color from "colors-cli";
import timer from "./loading.js";
import loading from "loading-cli";

//
import encrypt from "./encrypt.js";
import decrypt from "./decrypt.js";
async function keyGenerate() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.x148("\tCLI For Encryption / Decryption\t\t"));
    console.log("+------------------------------------------+");
    const options = [
      "Exit The Program",
      "Encryption",
      "Decryption",

    ];
    options.forEach((ele, index) =>
      console.log(color.x99(`\t${index} To ${ele}`))
    );
    console.log("+------------------------------------------+");
    const option = readlineSync.questionInt(
      "Enter Your Option From The Above Menu :"
    );
     
    if (option >= 0 && option <= options.length - 1) {
      switch (option) {
        case 0:
          console.log(color.green_bt("Exiting the program. Bye. Bye."));
          return;
        case 1:
          await encrypt();
          break;
        case 2:
          await decrypt();
          break;
      }
      const choice = readlineSync.question(
        color.blue_bt("Do you want to continue : (yes/no)")
      );
      if (
        choice == "y" ||
        choice == "Y" ||
        choice == "yes" ||
        choice == "YES"
      ) {
        keyGenerate();
      } else {
        console.log(color.green_bt("Exiting the program. Bye. Bye."));
      }
    } else {
      const load = loading({
        frames: ["😟", "😄", "☹️"],
        text: color.red(" Invalid Menu Option. Try Agaain. Redirecting .."),
        interval: 500,
      }).start();
      await timer(5000);
      load.stop();
      keyGenerate();
    }
      const key = await rsa.generateKey(2048);
      const privateKey = key.privateKey;
      const publicKey = key.publicKey;

      fs.writeFile("private.key", JSON.stringify(privateKey));
      fs.writeFile("public.key", JSON.stringify(publicKey));
  } catch (error) {
    console.error(error);
  }
}

keyGenerate();
// console.log("Keys are Generated.......")
