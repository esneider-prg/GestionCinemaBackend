const { getStorage } = require("firebase-admin/storage");
const { initializeApp, cert } = require("firebase-admin/app");
const dotenv = require("dotenv");

dotenv.config();

initializeApp({
  credential: cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
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
