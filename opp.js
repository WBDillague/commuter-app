// Add this to your existing script.js inside the map initialization

// 1. Connect to your local server
const socket = io('http://localhost:3000');

// 2. Listen for the "Broadcaster" from the server
socket.on('jeepUpdate', (data) => {
    // This calls the function we already wrote!
    updateVehicle(data.id, data.lat, data.lon, data.density);
});

// 3. Get all jeeps currently active when you first open the app
socket.on('initialData', (allJeeps) => {
    for (let id in allJeeps) {
        const jeep = allJeeps[id];
        updateVehicle(id, jeep.lat, jeep.lon, jeep.density);
    }
});


// 1. Better Mobile Map Options
const map = L.map('map', {
    zoomControl: false, // We'll move zoom to the bottom-right for thumb access
    tap: true           // Improves touch response
}).setView([14.5995, 120.9842], 14);

// 2. Put Zoom controls where thumbs can reach them (Bottom Right)
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// 3. Auto-center logic
// When the user moves, we don't want to force-jump the map (annoying), 
// but we want a "Center Me" button.
map.on('locationfound', (e) => {
    myLocation = e.latlng;
    document.getElementById('user-status').innerText = "Live";
    
    // User icon
    if (!window.userMarker) {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 7, fillColor: "#64ffda", color: "white", weight: 2, fillOpacity: 1
        }).addTo(map);
    } else {
        window.userMarker.setLatLng(e.latlng);
    }
});