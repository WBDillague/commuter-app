// Initialize Map
const map = L.map('map').setView([14.5995, 120.9842], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const jeeps = {}; 
let myLocation = null;

// Track User
map.locate({ setView: true, watch: true, maxZoom: 16 });

map.on('locationfound', (e) => {
    myLocation = e.latlng;
    document.getElementById('user-status').innerText = "Online";
    
    if (!window.userMarker) {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, fillColor: "#64ffda", color: "white", weight: 2, fillOpacity: 1
        }).addTo(map).bindPopup("You are here");
    } else {
        window.userMarker.setLatLng(e.latlng);
    }
});

function updateVehicle(id, lat, lon, density) {
    const newPos = [lat, lon];
    const densityConfig = {
        "low": { color: "#198754", label: "Low" },
        "mid": { color: "#fd7e14", label: "Medium" },
        "full": { color: "#dc3545", label: "Full" },
        "overloaded": { color: "#000000", label: "Overloaded" }
    };
    const config = densityConfig[density] || { color: "gray", label: "Unknown" };

    if (!jeeps[id]) {
        jeeps[id] = L.marker(newPos).addTo(map);
        document.getElementById('vehicle-count').innerText = Object.keys(jeeps).length;
    } else {
        jeeps[id].slideTo(newPos, { duration: 2000 });
    }

    const updatePopup = () => {
        let distMsg = myLocation ? (myLocation.distanceTo(jeeps[id].getLatLng()) / 1000).toFixed(2) + " km away" : "Calculating...";
        const content = `
            <div style="text-align: center;">
                <strong style="color:white;">${id}</strong><br>
                <div style="margin: 8px 0; padding: 4px; background: ${config.color}; color: white; border-radius: 4px; font-size: 10px;">
                    DENSITY: ${config.label}
                </div>
                <span style="font-size: 11px; color: #a8b2d1;">${distMsg}</span>
            </div>
        `;
        jeeps[id].bindPopup(content);
    };

    jeeps[id].on('click', updatePopup);
    updatePopup();
}

// SIMULATION: E-Jeep driving in a circle
let angle = 0;
setInterval(() => {
    angle += 0.1;
    const lat = 14.5995 + (Math.sin(angle) * 0.005);
    const lon = 120.9842 + (Math.cos(angle) * 0.005);
    updateVehicle("E-JEEP 01", lat, lon, "mid");
}, 3000);