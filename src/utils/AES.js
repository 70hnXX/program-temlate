import CryptoJS from "crypto-js";
//秘钥
const CRYPTOJSKEY = stringToByte("youedata12345678");
// 优易网加密
export const Encryption = data => {
  let key = CryptoJS.enc.Utf8.parse('youedata12345678')
  let iv = CryptoJS.enc.Utf8.parse(data)
  let encryptResult = CryptoJS.AES.encrypt(iv, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encodeURIComponent(
    CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)
  )
}
export const EncryptionWithoutEncode = data => {
  let key = CryptoJS.enc.Utf8.parse('youedata12345678')
  let iv = CryptoJS.enc.Utf8.parse(data)
  let encryptResult = CryptoJS.AES.encrypt(iv, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)
}
// 加密
export function encrypt(plaintText) {
  var plaintText = plaintText;
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
  var encryptedBase64Str = encryptedData.toString().replace(/\//g, "_");
  encryptedBase64Str = encryptedBase64Str.replace(/\+/g, "-");
  return encryptedBase64Str;
}
//解密
export function decrypt(encryptedBase64Str) {
  var vals = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
  var decryptedData = CryptoJS.AES.decrypt(vals, key, options);
  var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
  return decryptedStr
}

function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes
}