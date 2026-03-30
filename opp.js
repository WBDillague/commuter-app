lucide.createIcons();

// 1. Tab Switching Logic
function switchTab(tab) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tab + '-view').classList.remove('hidden');
    event.target.classList.add('active');
}

// 2. Simulated Agentic AI Data
function updateSystem() {
    // DHT22 Simulation
    document.getElementById('temp-val').innerText = (27 + Math.random() * 5).toFixed(1);
    document.getElementById('hum-val').innerText = (65 + Math.random() * 10).toFixed(0);

    // AI Density Decision
    const count = Math.floor(Math.random() * 25);
    const status = document.getElementById('ai-status');
    const bar = document.getElementById('ai-bar');
    const pct = (count / 20) * 100;

    bar.style.width = Math.min(pct, 100) + "%";

    if (count <= 8) {
        status.innerText = "AVAILABLE";
        status.style.color = "#34C759";
        bar.style.background = "#34C759";
    } else if (count <= 18) {
        status.innerText = "NEAR FULL";
        status.style.color = "#FFCC00";
        bar.style.background = "#FFCC00";
    } else {
        status.innerText = "FULL";
        status.style.color = "#FF3B30";
        bar.style.background = "#FF3B30";
    }
}

setInterval(updateSystem, 3000);
updateSystem();

function triggerAIReload() {
    const icon = document.getElementById('sync-icon');
    const aiBox = document.getElementById('ai-container');
    
    // 1. Start the "Thinking" animation
    icon.classList.add('spinning');
    aiBox.style.opacity = "0.5";
    aiBox.style.transform = "scale(0.98)";

    // 2. Simulate Network Delay (1.5 seconds)
    setTimeout(() => {
        // Update the data
        updateSystem(); 
        
        // Stop animation and "pop" the UI back
        icon.classList.remove('spinning');
        aiBox.style.opacity = "1";
        aiBox.style.transform = "scale(1)";
        
        // Add a temporary glow to show it's updated
        aiBox.classList.add('pulse');
        setTimeout(() => aiBox.classList.remove('pulse'), 500);
    }, 1500);
}

// Update the switchTab function to handle smooth entry
function switchTab(tabName) {
    const views = document.querySelectorAll('.view');
    const buttons = document.querySelectorAll('.tab-btn');

    views.forEach(v => v.classList.add('hidden'));
    buttons.forEach(b => b.classList.remove('active'));

    const activeView = document.getElementById(tabName + '-view');
    activeView.classList.remove('hidden');
    
    // Add a slight delay for the slide-in effect
    setTimeout(() => {
        activeView.style.transform = "translateX(0)";
        activeView.style.opacity = "1";
    }, 10);
    
    event.currentTarget.classList.add('active');
}