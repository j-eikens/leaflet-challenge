// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  


const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(data => {
    
    console.log(data);

    let markers = L.markerClusterGroup();

    // create coordinate array
    let coordinateArray = [];
    let depthArray = [];

    // Loop through JSON to create data arrays
    for (let i = 0; i < data.length; i++) {

        let location = data.features[i];

        
        if (location){

            markers.addLayer([location.geometry.coordinates[1], location.geometry.coordinates[0]])
                // .bindPopup()
        }

        coordinateArray.push(location.geometry.coordinates[0]);
    }

    myMap.addLayer(markers);

    console.log("coordinateArray:", coordinateArray)
});