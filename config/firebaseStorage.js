const { getStorage } = require("firebase-admin/storage");
const { initializeApp, cert } = require("firebase-admin/app");
const dotenv = require("dotenv");

dotenv.config();

initializeApp({
  credential: cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDUsYiI/CdQHzue\nKxtuVv+zB6bm91MexfG8HVNUFk2ffZ35kEGqxVl1v8dH0dYEqd38goswNfAL3UBL\nchNcOOs2y/ls0i8sU3A3zGuMUr2YQjnWdqrp6KktnbMNoUTCrm7J/ZI04JPL1Ry2\nrtrJ8DMLkhv8UolNRckKXNS1XEcoFdX7jooFAGc4y3zkt+7r3TDTBNUkNSVxhZCR\nKSasKD0BjRaXrbWetG+kA0QFUjRfrgOiTJtdC6HCyuBhFU81J1itHDehgP+X2WYz\niZbf8nr7/YN5aUXl3AwVAbhoeuFswWZ4IAzzxFPP2rluiLu9oTjtdRdvwxEPHBO7\nXp3uXPEvAgMBAAECggEAIYm0+9S25j1mizRE6Qsy2qoUOUs6ghm4Wm9NWm8B4mpO\nZLHIiQMBbj3FUJ/X3XhjlpOHGx0GMvi6UKs2Pk6DWGqlc/FYmua1RTcopkHNv5qB\nwD2KCcQ0GQtK1pVdYE1dDuC7EzduVq/ODUhZG4qSofpyC0GAgPzGDKpCqC5a0gkF\nurKrkpcXGjZS73Hnq2mlk2xw114GTOkUwjqqhCj8kOF8EBijBsz3eZUiAiDoShFr\ndIh8LCw7SSdurXRJmVX+fs6jjuGFe1ZG7JCxt7slacmJR+DvKFxi2CPvZmWEAwLu\nTmWGks4cjAzt9naIJFcRbZhy7ofm6j5IXUBOWm3cwQKBgQD1vm8tLdECdIHYhzsU\nzxey7u9YbMb6ZjTRbMlBzufoG7SghWY10eoPCC+AWr1TmYiRN+9ar4E0yk2pF1n1\nsbSqoN7TJ12lUjY2S3h5mt4HClCh/VY1HAWvRo2IjNtH15Z7md5lA4DjL6wQ0xIW\nfB2+OV7al4AFWd2qY6NptRZ4XwKBgQDdkfvIUolGtcj+iwxoBtcBmufAGk0UhwuK\nS2GCsdytovVSm4CMJpEL+M739G5Fn7TXr+Cttedix5H6xXjIzSG6KqHpHxjKXxwS\nKJWKp7P1x2PGco50/Hvc94HsHxTQUSsVPvkMW8JwuIWcL71uPTkExPwdQp1hXjZ4\nHmQQVbV5MQKBgQCM/wCG6Xy8beB6PczWOaQdVB4bm/3meXHgnwwyJ+bDM/JFD4T/\naDtk+ItYl7d9GeBTgcZhP8VgZpp8ZBuHbrh8FeUDPdjrG+pi6JZtH0A4xeBRsSsf\nOb7BPDfEmxzNcZKzxCrnxkTTFO0ikhgUso3WMNCNltMrPs6CDr0Zz37e/QKBgEev\n99q0eZ3bKxDQRE9UBzSJvfm1iMLffqhcA0yZ52B2nREBJvIxeDR7Z9tpxlPYfFZc\nnUEW3apkD6MnSREO7Z6iNIiMeyTe6OInJ1sZL2yR+oI2hkjrd9fibLLMy5sq59mT\n6lhJR/vYd8I04AFO5afZZAjDiM/7/3uVuaJfWLvBAoGAOrXse2jC0MuYJpUuZexP\nVF1uOeJCYxNEQuFXfQR31ZLk7njABZylsqYfT+A0Xu8/0uCY+8ksjoe2elA0/LAQ\nj+F7rvWEdy/JPVScSEW/8VeCe/Vkap5CSPRUUrq0jFov4HDRPKCr5bLOwmJgIvEv\nVgGF+aRZUyEgB04f9okQp/Q=\n-----END PRIVATE KEY-----\n",
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

});

const privateKey = process.env.PRIVATE_KEY;
console.log("Valor de PRIVATE_KEY:", privateKey);

// Verifica si PRIVATE_KEY está definido
if (!privateKey) {
  console.error("ERROR: La variable de entorno PRIVATE_KEY no está definida.");
} else {
  // Intenta dividir la cadena
  const privateKeySplit = privateKey.split(String.raw`\n`).join('\n');
  console.log("Resultado de split:", privateKeySplit);
}



const storage = getStorage().bucket();


module.exports = storage
