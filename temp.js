
const fs = require('fs');

const N = 1000;

// Bangalore bounding box
const LAT_MIN = 12.80;
const LAT_MAX = 13.15;
const LON_MIN = 77.40;
const LON_MAX = 77.80;

// categories (mildly realistic retail)
const categories = [
  "Casual",
  "Sneakers",
  "Ethnic",
  "Denim",
  "Sportswear",
  "Formal",
  "Luxury",
  "FastFashion",
  "Streetwear"
];

// name fragments for mildly realistic brand-like names
const prefix = [
  "Urban","Metro","City","Maxx","Elite","Prime","Style","Trend","Denim","Fab",
  "Sneaker","Ethnic","Luxury","Casual","Fit","Core","Studio","Label","House","Co",
  "Capsule","Cotton","Silk","Vintage","Sport","Active","Street","Modern","Classic"
];

const suffix = [
  "Wear","Co","Hub","Store","Outlet","Studio","Lane","House","Gallery","Shop",
  "Nation","Point","Corner","Centre","Room","Closet","Market","World","Works",
  "Factory","Collective","District","Lab","Boutique","Apparel","Fashion"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const shops = [];

for (let i = 0; i < N; i++) {
  const name = `${pick(prefix)} ${pick(suffix)}`;
  const lat = rand(LAT_MIN, LAT_MAX);
  const lon = rand(LON_MIN, LON_MAX);
  const category = pick(categories);

  shops.push({ name, lat, lon, category });
}

fs.writeFileSync("shops.json", JSON.stringify(shops, null, 2));
console.log("Generated shops.json with", N, "entries");
