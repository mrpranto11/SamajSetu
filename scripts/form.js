import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBNUeg5YaVMxHBCsIABvDEZYq-_K1k2ScI",
  authDomain: "samajsetu-677b9.firebaseapp.com",
  projectId: "samajsetu-677b9",
  storageBucket: "samajsetu-677b9.appspot.com",
  messagingSenderId: "74464521299",
  appId: "1:74464521299:web:f0885015dfd3921bc6eaa6",
  measurementId: "G-6EJX2Y3VT6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ImageKit Config
const imagekit = new ImageKit({
  publicKey: "public_HVomVbB4TAaQTbNQgNmHgDFtpGk=",
  urlEndpoint: "https://ik.imagekit.io/cwhssign7",
  authenticationEndpoint: "https://yourserver.com/auth" // dummy for client-side upload
});

document.getElementById("helpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const desc = document.getElementById("description").value;
  const fileInput = document.getElementById("file1");
  const status = document.getElementById("statusMsg");
  status.innerText = "Uploading...";

  let imageUrl = "";
  if (fileInput.files[0]) {
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("fileName", fileInput.files[0].name);
    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("public_HVomVbB4TAaQTbNQgNmHgDFtpGk=:"),
      },
      body: formData,
    });
    const result = await response.json();
    imageUrl = result.url;
  }

  await addDoc(collection(db, "requests"), {
    name,
    description: desc,
    image: imageUrl,
    createdAt: serverTimestamp(),
  });

  status.innerText = "Request submitted successfully!";
  document.getElementById("helpForm").reset();
});
