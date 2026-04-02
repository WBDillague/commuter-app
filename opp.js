// 1. Initialize Map
const map = L.map('map').setView([14.5995, 120.9842], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let myLocation = null;
const jeeps = {}; // Object to store all active e-jeeps

// 2. Track My Location
map.locate({ setView: true, watch: true });
map.on('locationfound', (e) => {
    myLocation = e.latlng;
    L.circle(e.latlng, { radius: 15, color: '#1a73e8' }).addTo(map).bindPopup("You are here");
});

// 3. Function to update or create a Jeep
function updateJeep(id, lat, lon, density) {
    const pos = [lat, lon];
    
    // Calculate distance only if we have the user's location
    let distText = "Calculating...";
    if (myLocation) {
        const meters = myLocation.distanceTo(pos);
        distText = (meters / 1000).toFixed(2) + " km away";
    }

    // Determine color/badge based on density
    const densityColors = {
        "low": "green",
        "mid": "orange",
        "full": "red",
        "overloaded": "darkred"
    };

    // If Jeep doesn't exist yet, create it
    if (!jeeps[id]) {
        jeeps[id] = L.marker(pos).addTo(map);
    } else {
        jeeps[id].setLatLng(pos);
    }

    // Update the Popup content (this shows when you click)
    const popupContent = `
        <div style="text-align: center;">
            <b style="font-size: 1.2em;">E-Jeep: ${id}</b><br>
            <hr>
            <span style="color: ${densityColors[density] || 'black'}; font-weight: bold;">
                Density: ${density.toUpperCase()}
            </span><br>
            <span>Distance: ${distText}</span>
        </div>
    `;
    
    jeeps[id].bindPopup(popupContent);
}

// 4. SIMULATION: Test with two different e-jeeps
// In the real app, this data will come from your Backend Server
setTimeout(() => {
    updateJeep("EJ-Route-01", 14.605, 120.992, "low");
    updateJeep("EJ-Route-02", 14.590, 120.980, "full");
}, 2000);