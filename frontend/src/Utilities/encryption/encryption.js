import CryptoJS from 'crypto-js';

const ENC_KEY = 'your_encryption_key'; // Replace 'your_encryption_key' with your actual encryption key

function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, ENC_KEY).toString();
  return encrypted;
}

function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, ENC_KEY).toString(CryptoJS.enc.Utf8);
  return decrypted;
}

function encryptObject(obj) {
  const jsonString = JSON.stringify(obj);
  return encrypt(jsonString);
}

function decryptToObject(encryptedText) {
  const decryptedJsonString = decrypt(encryptedText);
  return JSON.parse(decryptedJsonString);
}

const btoa = (text) => {
  return window.btoa(text); // Use window.btoa() for base64 encoding
};

const atob = (base64) => {
  return window.atob(base64); // Use window.atob() for base64 decoding
};

function generateRandomIV() {
  const randomBytes = new Array(16);
  for (let i = 0; i < 16; i++) {
    randomBytes[i] = Math.floor(Math.random() * 256);
  }
  const iv = CryptoJS.lib.WordArray.create(Uint8Array.from(randomBytes));
  return CryptoJS.enc.Base64.stringify(iv);
}

const encryptData = (data) => {
  const jsonString = JSON.stringify(data);
  const i = generateRandomIV();
  const iv = CryptoJS.enc.Utf8.parse(i);
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonString), ENC_KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });

  let transitmessage = JSON.stringify({
    iv: btoa(i),
    value: encrypted.toString(),
  });
  transitmessage = btoa(transitmessage);

  return transitmessage;
};

const decryptData = (data) => {
  const binaryString = atob(data);
  const jsonString = JSON.parse(binaryString);

  const decrypted = CryptoJS.AES.decrypt(jsonString.value, ENC_KEY, {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Utf8.parse(atob(jsonString.iv)),
  });

  const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

  return decrypt;
};


export {
  encrypt,
  decrypt,
  encryptObject,
  decryptToObject,
  generateRandomIV,
  encryptData,
  decryptData,
};
