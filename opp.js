// 1. Initialize Map (Default centered on Manila)
const map = L.map('map').setView([14.5995, 120.9842], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const jeeps = {}; // Collection of jeep markers
let myLocation = null;

// 2. Locate the User (The Passenger)
map.locate({ setView: true, watch: true, maxZoom: 16 });

map.on('locationfound', (e) => {
    myLocation = e.latlng;
    document.getElementById('user-status').innerText = "Online";
    
    // Add or update User Marker
    if (!window.userMarker) {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8,
            fillColor: "#0d6efd",
            color: "white",
            weight: 3,
            fillOpacity: 1
        }).addTo(map).bindPopup("You are here");
    } else {
        window.userMarker.setLatLng(e.latlng);
    }
});

map.on('locationerror', () => {
    document.getElementById('user-status').innerText = "GPS Error";
});

// 3. Update/Create Jeep Function
function updateVehicle(id, lat, lon, density) {
    const newPos = [lat, lon];
    
    const densityConfig = {
        "low": { color: "#198754", label: "Low" },        // Green
        "mid": { color: "#fd7e14", label: "Medium" },     // Orange
        "full": { color: "#dc3545", label: "Full" },       // Red
        "overloaded": { color: "#000000", label: "Overloaded" } // Black
    };

    const config = densityConfig[density] || { color: "gray", label: "Unknown" };

    // Create marker if it doesn't exist
    if (!jeeps[id]) {
        jeeps[id] = L.marker(newPos).addTo(map);
        document.getElementById('vehicle-count').innerText = Object.keys(jeeps).length;
    } else {
        // ANIMATION: Smoothly slide to the new position over 2 seconds
        jeeps[id].slideTo(newPos, { duration: 2000 });
    }

    // Dynamic Popup Content
    const updatePopup = () => {
        let distMsg = "Location pending...";
        if (myLocation) {
            const meters = myLocation.distanceTo(jeeps[id].getLatLng());
            distMsg = (meters / 1000).toFixed(2) + " km away from you";
        }

        const content = `
            <div style="text-align: center; font-family: sans-serif;">
                <strong style="font-size: 14px;">${id}</strong><br>
                <div style="margin: 8px 0; padding: 4px; background: ${config.color}; color: white; border-radius: 5px; font-size: 11px; font-weight: bold;">
                    DENSITY: ${config.label}
                </div>
                <span style="font-size: 12px; color: #666;">${distMsg}</span>
            </div>
        `;
        jeeps[id].bindPopup(content);
    };

    // Update popup info whenever it's clicked or moved
    jeeps[id].on('click', updatePopup);
    updatePopup(); 
}

// 4. SIMULATION: This replaces the real server data for now
// Vehicle 1: Moves slowly
setInterval(() => {
    const lat = 14.600 + (Math.random() * 0.002);
    const lon = 120.985 + (Math.random() * 0.002);
    updateVehicle("EJ-01-NORTH", lat, lon, "low");
}, 3000);

// Vehicle 2: Fixed spot, higher density
updateVehicle("EJ-02-STATION", 14.595, 120.982, "full");