
// Initialize the map
var map = L.map('map').setView([19.0760, 72.8777], 5); // Default location (New York)

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var markers = []; // Store markers

// Function to add a marker with a note
function addMarker(lat, lng) {
    let note = prompt("Enter a note for this marker:");
    if (note) {
        let marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(note)
            .openPopup();

        // Add marker to array
        markers.push(marker);

        // Right-click event to remove marker
        marker.on("contextmenu", function () {
            map.removeLayer(marker);
            markers = markers.filter(m => m !== marker);
        });
    }
}

// Event listener for map clicks (add markers)
map.on('click', function (e) {
    addMarker(e.latlng.lat, e.latlng.lng);
});

// Reset all markers
document.getElementById('resetMarkers').addEventListener('click', function () {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
});
