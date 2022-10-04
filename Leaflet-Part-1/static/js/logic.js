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

function chooseColor(magnitude) {
    if (magnitude < 1) return "pink";
    else if (magnitude < 3) return "yellow";
    else if (magnitude < 6) return "orange";
    else if (magnitude < 9) return "red";
    else return "red";
}

function chooseSize(depth){

}

// var geojsonMarkerOptions = {
//     radius: 8,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };

// Get JSON Data
d3.json(url).then(function(data) {

    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: chooseColor(data.features[0].properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    console.log('data.features:', data.features[0].properties.mag)
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            
        }
    }).addTo(myMap);


    // console.log("fillColor:", chooseColor(feature.properties.mag))    

});