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
    if (depth <= 10) return "#ffffb2";
    else if (depth <= 30) return "#fecc5c";
    else if (depth <= 60) return "#fd8d3c";
    else if (depth <= 90) return "#f03b20";
    else return "#bd0026";
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

// Get JSON Data
d3.json(url).then(function(data) {

    console.log("data", data)
   
    geojson = L.geoJson(data, {
        style: markerStyle,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: function(feature, layer) {
        // layer.bindPopup("<h3> Location: " + feature.properties.place + "<h3>");
        layer.bindPopup("<strong> Location: " + feature.properties.place + "</strong><br /><br />Magnitude: " +
        feature.properties.mag + "<br /><br />Depth: " + feature.geometry.coordinates[2]);

        },  

    }).addTo(myMap);

    // for loop to generate depth list
    let depth = []

    for (let i=0; i < data.features.length; i++) {
        let d = data.features[i].geometry.coordinates[2];
        depth.push(d);
    }

    depth.sort((a, b) => a - b );

    console.log('depth sorted', depth)

    let legendArray = [Math.round(depth[0]), 15, 35, 65, Math.round(depth[depth.length -1])];
    let coloArray = chooseColor(legendArray);

    // Create a legend
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");

        // let colors = geojson.options.colors;
        let labels = [];

        console.log('labels', labels)

        let legendInfo = "<div class=\"min\">" + legendArray[0] + "</div>" +
          "<div class=\"max\">" + legendArray[legendArray.length - 1] + "</div>" +
        "</div>";
  

        div.innerHTML = legendInfo;

        legendArray.forEach(function(legendArray, index) {
            labels.push("<li style=\"background-color: " + chooseColor(legendArray) + "\"></li>");
        });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

      // Adding the legend to the map
    legend.addTo(myMap);
});