let map;
let shopData = [];

async function init() {
  L.Icon.Default.imagePath = "./images/";

  map = L.map('map').setView([12.9716, 77.5946], 13);

  // stable CARTO tiles
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    {
      subdomains: ['a','b','c','d'],
      maxZoom: 19,
      attribution: '© CARTO | © OSM'
    }
  ).addTo(map);

  // load dataset
  const resp = await fetch('shops.json');
  shopData = await resp.json();

  // let layout settle
  requestAnimationFrame(() => map.invalidateSize(true));
}

// distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)**2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

// locate user
function locateUser() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    document.getElementById("ulat").value = lat.toFixed(6);
    document.getElementById("ulon").value = lon.toFixed(6);

    L.marker([lat, lon]).addTo(map).bindPopup("You are here");
    map.setView([lat, lon], 13);

    setTimeout(() => map.invalidateSize(), 200);
  });
}

// main search
function runQuery() {
  const ulat = Number(document.getElementById("ulat").value);
  const ulon = Number(document.getElementById("ulon").value);
  const R = Number(document.getElementById("radius").value);
  const cat = document.getElementById("category").value;

  // clear only markers + circle (keep tiles)
  map.eachLayer(l => {
    if (l instanceof L.Marker || l instanceof L.Circle)
      map.removeLayer(l);
  });

  // user marker
  L.marker([ulat, ulon]).addTo(map).bindPopup("You");

  // radius circle
  L.circle([ulat, ulon], {
    radius: R * 1000,
    color: 'blue',
    fillOpacity: 0.1
  }).addTo(map);

  let results = [];

  shopData.forEach(s => {
    const d = haversine(ulat, ulon, s.lat, s.lon);
    if (d <= R && (cat === "ALL" || s.category === cat)) {
      results.push({...s, d});
      L.marker([s.lat, s.lon]).addTo(map)
        .bindPopup(`${s.name} (${s.category})<br>${d.toFixed(2)} km`);
    }
  });

  results.sort((a,b)=> a.d - b.d);

  let out = results.length ? "" : "No shops within radius.";

  results.forEach(r => {
    out += `
      <div style="margin-bottom:8px; cursor:pointer;"
           onclick="focusShop(${r.lat}, ${r.lon})">
        <b>${r.name}</b><br>
        <small>${r.category}</small><br>
        <small>${r.d.toFixed(2)} km away</small>
      </div>`;
  });

  document.getElementById("shopList").innerHTML = out;

  setTimeout(() => map.invalidateSize(true), 150);
}

// sidebar click focus
function focusShop(lat, lon) {
  map.setView([lat, lon], 17);
  setTimeout(() => map.invalidateSize(), 120);
}

init();
