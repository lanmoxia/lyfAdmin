// utils/crypto.js

// 将PEM格式的公钥转换为CryptoKey对象
export const pemToCryptoKey = (pem) => {
  // 去掉PEM字符串中的头尾以及换行符
  const b64 = pem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, '');
  // 将base64编码的字符串转换为ArrayBuffer
  const binaryDerString = window.atob(b64);
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: {name: 'SHA-256'}
    },
    true,
    ['encrypt']
  );
}

// ArrayBuffer转换辅助函数
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// ArrayBuffer 转换为 Base64 字符串
export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0, len = bytes.byteLength; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}