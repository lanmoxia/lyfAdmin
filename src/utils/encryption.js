// utils/encryption.js

export const encryptPassword = async (password, publicKey) => {
  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);
  try {
    const encryptedPassword = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKey,
      encodedPassword
    );
    return encryptedPassword;
  } catch (error) {
    console.error('密码加密失败:', error);
  }
};

export const decryptPassword = async (encryptedPassword, privateKey) => {
  try {
    const decryptedPassword = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privateKey,
      encryptedPassword
    );
    return decryptedPassword;
  } catch (error) {
    console.error('密码解密失败:', error);
  }
};
