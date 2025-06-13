import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBNUeg5YaVMxHBCsIABvDEZYq-_K1k2ScI",
  authDomain: "samajsetu-677b9.firebaseapp.com",
  projectId: "samajsetu-677b9",
  storageBucket: "samajsetu-677b9.appspot.com",
  messagingSenderId: "74464521299",
  appId: "1:74464521299:web:f0885015dfd3921bc6eaa6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));

const requestsList = document.getElementById("requestsList");
const searchInput = document.getElementById("search");

function renderRequest(doc) {
  const data = doc.data();
  return `
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
      <h4>${data.name}</h4>
      <p>${data.description}</p>
      ${data.image ? `<img src="${data.image}" style="max-width:300px;">` : ""}
    </div>
  `;
}

onSnapshot(q, (snapshot) => {
  let html = "";
  snapshot.forEach((doc) => {
    html += renderRequest(doc);
  });
  requestsList.innerHTML = html;

  searchInput.addEventListener("input", () => {
    const filtered = snapshot.docs.filter(d =>
      d.data().name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    let filteredHTML = "";
    filtered.forEach(doc => filteredHTML += renderRequest(doc));
    requestsList.innerHTML = filteredHTML;
  });
});
