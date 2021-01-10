// website: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// dataset selected: "Past 7 Days"
// REFERENCEs: 
// *class activities notes to complete hw
// *https://leafletjs.com/reference-1.7.1.html#geojson
// *details for URL paramaters: https://earthquake.usgs.gov/fdsnws/event/1/


// Create a map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 3
  });
// adding layer tile 
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// // url for earthquake data (for the past 7 days)
// var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"; 

// // // Perform a GET request to the query URL (similar to Activity10/Day1)
// //  d3.json(queryUrl, function(data) {
// //      // Once we get a response, send the data.features object to the createFeatures function
// //     createFeatures(data.features);
// //   });
