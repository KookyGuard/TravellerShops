# TravellerShops

TravellerShops is a small web app that helps users discover the types of clothing stores available around them while moving through a city.

Instead of asking locals or friends about “where to buy what”, the app shows nearby shops, their categories, and approximate distance from the user. Inspired by the idea of being new in a city and trying to shop without tribal knowledge.

---

## Features

- **Map-based shop display**
- **User geolocation** (mobile + desktop)
- **Category filtering**
- **Radius search**
- **Distance calculation (Haversine)**
- **Dark (Uber-style) UI theme**
- **Works entirely client-side**
- **Mobile-friendly demo**

No backend, no database, no accounts. Just static data + logic.

---

## How It Works

1. User sets/locates their coordinates.
2. App filters shops within a selected radius.
3. Categories can be narrowed (e.g. Sneakers, Casual, Luxury, etc).
4. Results show both on map (markers) and in sidebar list.
5. Clicking a shop recenters the map for quick inspection.

---

## Tech Stack

- **Leaflet.js** (maps + markers)
- **OpenStreetMap / Carto tiles**
- **HTML + CSS + JS (vanilla)**
- **Static JSON dataset (`shops.json`)**

No frameworks, no backend server.

---

## 📁 Project Structure

