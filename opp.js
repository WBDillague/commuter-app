// Initialize Icons
lucide.createIcons();

/**
 * Switch between Map and Stats views
 */
function switchTab(tabName) {
    const views = document.querySelectorAll('.view');
    const buttons = document.querySelectorAll('.tab-btn');

    views.forEach(v => v.classList.add('hidden'));
    buttons.forEach(b => b.classList.remove('active'));

    const activeView = document.getElementById(tabName + '-view');
    activeView.classList.remove('hidden');
    
    // Add 'active' class to the button that was clicked
    event.currentTarget.classList.add('active');
}

/**
 * Simulate the Cloud Syncing process
 */
function triggerAIReload() {
    const icon = document.getElementById('sync-icon');
    const card = document.getElementById('ai-card');
    
    icon.classList.add('spinning');
    card.style.opacity = "0.6";

    // Simulate network delay from ESP32 to Cloud
    setTimeout(() => {
        updateHardwareData();
        icon.classList.remove('spinning');
        card.style.opacity = "1";
        card.classList.add('pulse');
        setTimeout(() => card.classList.remove('pulse'), 500);
    }, 1200);
}

/**
 * Generate random data to mimic real IoT sensors (DHT22 & ESP32-CAM)
 */
function updateHardwareData() {
    // 1. Environmental Data
    const temp = (26 + Math.random() * 6).toFixed(1);
    const hum = (60 + Math.random() * 15).toFixed(0);
    document.getElementById('temp-val').innerText = temp;
    document.getElementById('hum-val').innerText = hum;

    // 2. Agentic AI Occupancy Decision
    const capacity = 22;
    const currentPass = Math.floor(Math.random() * 25); // 0 to 24 passengers
    const pct = (currentPass / capacity) * 100;
    
    const status = document.getElementById('ai-status');
    const bar = document.getElementById('ai-bar');
    const detail = document.getElementById('occupancy-detail');

    bar.style.width = Math.min(pct, 100) + "%";
    detail.innerText = `Current Load: ${currentPass} / ${capacity} passengers`;

    if (currentPass <= 10) {
        status.innerText = "AVAILABLE";
        status.style.color = "#34C759";
        bar.style.background = "#34C759";
    } else if (currentPass <= 19) {
        status.innerText = "NEAR FULL";
        status.style.color = "#FFCC00";
        bar.style.background = "#FFCC00";
    } else {
        status.innerText = "FULL";
        status.style.color = "#FF3B30";
        bar.style.background = "#FF3B30";
    }
}

// Initial Data Load
updateHardwareData();
// Auto-refresh every 10 seconds to simulate live movement
setInterval(updateHardwareData, 10000);