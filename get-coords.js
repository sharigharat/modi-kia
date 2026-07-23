const fs = require('fs');

async function getCoords() {
  const q1 = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=Sapna+Industrial+Estate,+Pimpalghar', {headers: {'User-Agent': 'MyCustomApp/1.0 (test@example.com)'}});
  console.log(await q1.json());
}
getCoords();
