// Creating the map object
let myMap = L.map("map", {
    center: [35.7, -100.95],
    zoom:4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// URL Link
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to select color base on earthquake depth
function chooseColor(depth) {
    if (depth < 1) return "pink";
    else if (depth < 3) return "yellow";
    else if (depth < 6) return "orange";
    else if (depth < 9) return "red";
    else return "red";
}

// Function to style markers
function markerStyle(feature) {
    return{
        radius: feature.properties.mag * 2.5,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
}

// Function to add text to marker
// function onEachFeature()


// Get JSON Data
d3.json(url).then(function(data) {
   
    L.geoJson(data, {
        style: markerStyle,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        }
    }).addTo(myMap);
});