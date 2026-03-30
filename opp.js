// Initialize Icons
lucide.createIcons();

// Simulate live data updates
function updateLiveStatus() {
    const locations = ["Near SM North", "Along Katipunan", "Passing Ayala", "Arriving Soon"];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    
    document.getElementById('location-status').innerText = randomLoc;
    document.getElementById('eta-timer').innerText = Math.floor(Math.random() * 15 + 1) + " mins";
}

// Update status every 5 seconds
setInterval(updateLiveStatus, 5000);
updateLiveStatus();

function updateSmartJeepData() {
    // 1. Simulate DHT22 Temperature/Humidity
    const temp = (28 + Math.random() * 5).toFixed(1); // 28-33°C
    const hum = (60 + Math.random() * 10).toFixed(0);  // 60-70%
    document.getElementById('temp-val').innerText = temp;
    document.getElementById('hum-val').innerText = hum;

    // 2. Simulate AI Decision Engine (Based on your diagram)
    const passengerCount = Math.floor(Math.random() * 22); // 0 to 22 passengers
    const pill = document.getElementById('ai-status-pill');
    const iconBox = document.getElementById('ai-icon-box');

    if (passengerCount <= 10) {
        pill.innerText = "AVAILABLE";
        pill.className = "status-pill status-available";
        iconBox.style.color = "#2e7d32";
    } else if (passengerCount <= 18) {
        pill.innerText = "NEAR FULL";
        pill.className = "status-pill status-near-full";
        iconBox.style.color = "#fbc02d";
    } else {
        pill.innerText = "FULL";
        pill.className = "status-pill status-full";
        iconBox.style.color = "#c62828";
    }
}

// Update every 4 seconds
setInterval(updateSmartJeepData, 4000);
updateSmartJeepData();