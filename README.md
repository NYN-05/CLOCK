# Modern New Tab Chrome Extension

## Features
- Clock with smooth animation
- Weather information based on location
- Google search
- Customizable shortcuts
- Dark/Light mode toggle
- Custom background video with fallback image

## Installation
1. Clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

## Configuration
1. Get an API key from [OpenWeatherMap](https://openweathermap.org/)
2. Set the API key in Chrome storage:
   - Open Chrome DevTools (F12)
   - Go to Console tab
   - Run: `chrome.storage.sync.set({weatherApiKey: '1a91ceead8a2557e72f1aa322bc40606'})`
   - APi key: 1a91ceead8a2557e72f1aa322bc40606

## Adding Background Videos
Place your video files in the extension folder:
- `background1.mp4` (primary video)
- `background2.mp4` (fallback video)
- `fallback.jpg` (static image fallback)

## Troubleshooting
- If weather doesn't load: Check API key and internet connection
- If video doesn't play: Ensure video files exist and are in correct format
- If extension crashes: Reload the extension from chrome://extensions
