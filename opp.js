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

function triggerAlert() {
    alert("🔔 Notification Set! We'll alert you when the Jeep is 2 minutes away.");
}