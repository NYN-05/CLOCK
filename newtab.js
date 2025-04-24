// Initialize extension when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    updateClock();              // Display initial clock
    setInterval(updateClock, 1000); // Update clock every second
    fetchWeather();             // Get weather data
    setupDarkMode();            // Initialize dark mode toggle
    
    // Handle video loading errors
    const video = document.getElementById('background-video');
    video.addEventListener('error', () => {
        console.log('Video failed to load, using fallback image');
        video.poster = 'fallback.jpg';
        video.load();
    });
});

/**
 * Updates the clock display with current time
 * @returns {void}
 */
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

/**
 * Fetches weather data from OpenWeatherMap API
 * @async
 * @returns {Promise<void>}
 * @warning API key is exposed - should be moved to backend
 */
async function fetchWeather() {
    // API key hardcoded here
    const apiKey = 'f6026abfb7f1ae2ff7479b95a51aa492'; // Replace with your own API key

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Weather API error');
                const data = await response.json();
                document.getElementById("weather-status").innerText = 
                    `${data.main.temp}°C • ${data.weather[0].description}`;
            } catch (error) {
                console.error('Weather fetch failed:', error);
                document.getElementById("weather-status").innerText = "Unable to fetch weather";
            }
        },
        (error) => {
            console.error('Geolocation error:', error);
            document.getElementById("weather-status").innerText = "Location access denied";
        }
    );
}

/**
 * Initializes dark mode functionality
 * Toggles between light/dark modes and saves preference to localStorage
 */
function setupDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    
    // Set initial mode
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        toggle.innerText = "🌙";
    }

    // Toggle handler
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkModeNow = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkModeNow ? "enabled" : "disabled");
        toggle.innerText = isDarkModeNow ? "🌙" : "☀️";
    });
}
