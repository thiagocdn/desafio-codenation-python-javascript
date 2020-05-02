module.exports = function decrypt(shift, encrypted){

  let decrypted = '';

  for (const c of encrypted) {
    const n = c.charCodeAt(0);
    if (n >= 97 + shift && n<=122) {
      decrypted = decrypted + String.fromCharCode((n - shift));
    } else if (n >= 97 && n < 97 + shift) {
      decrypted = decrypted + String.fromCharCode((n - shift + 26));
    } else {
      decrypted = decrypted + c;
    }
  };

  return decrypted;
}


