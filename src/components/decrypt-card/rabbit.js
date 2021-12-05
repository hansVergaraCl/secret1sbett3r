export const rabbitDecrypt = (decrypted) => {
  var chars = [],
    decryptedArr = decrypted.toString().split("");
  while (decryptedArr.length !== 0) {
    chars.push(
      String.fromCharCode(parseInt(decryptedArr.splice(0, 2).join(""), 16))
    );
  }
  return chars.join("");
};
