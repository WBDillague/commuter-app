// 1. Initialize the Map
const map = L.map('map').setView([14.5995, 120.9842], 13); // Manila Coordinates

// 2. Add the OpenStreetMap Tiles (The actual map images)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Create a Custom Icon for the E-Jeep (Optional but looks cool)
const jeepIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854894.png', // Replace with a jeep icon
    iconSize: [40, 40]
});

// 4. Placeholder for the Jeep Marker
let jeepMarker = L.marker([14.5995, 120.9842], { icon: jeepIcon }).addTo(map);
jeepMarker.bindPopup("E-Jeep 01").openPopup();

// 5. Logic to get "My Location" (The Passenger)
let myLocation = null;
map.locate({ setView: false, watch: true });

map.on('locationfound', (e) => {
    myLocation = e.latlng;
    L.circle(e.latlng, { radius: 10, color: 'blue' }).addTo(map).bindPopup("You are here");
});

// 6. Function to update the Jeep position (To be triggered by the Server later)
function updateJeepLocation(newLat, newLon) {
    const newPos = [newLat, newLon];
    jeepMarker.setLatLng(newPos);
    map.panTo(newPos); // Keeps the jeep in view

    if (myLocation) {
        const dist = myLocation.distanceTo(newPos); // Distance in meters
        document.getElementById('distance').innerText = (dist / 1000).toFixed(2) + " km";
        document.getElementById('status').innerText = "Live: Moving";
    }
}

// TEST: Manually move the jeep after 3 seconds to see if it works
setTimeout(() => {
    updateJeepLocation(14.6050, 120.9900);
}, 3000);