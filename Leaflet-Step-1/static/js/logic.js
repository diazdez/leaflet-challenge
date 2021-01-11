// website: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// dataset selected: "Past 7 Days"
// REFERENCEs: 
// *class activities notes to complete hw
// *https://leafletjs.com/reference-1.7.1.html#geojson
// *details for URL paramaters: https://earthquake.usgs.gov/fdsnws/event/1/
// *Legend code: https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map



// url for earthquake data (for the past 7 days)
var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"; 


// DATA MARKERS:  
//================================

// function to determine marker size based on magnitude
function markerSize(mag){
  return mag * 5;
}

// function that assigns colors to the markers  
// depth of the earthquake is measured by marker color
// website confirms depth = 3rd value for geometry's Coordinates
function getColor(depth) {

  // Conditionals for depth
  if (depth < 2) {
    return "red";
  }
  else if (depth < 4) {
   return "blue";
  }
  else if (depth < 6) {
    return "yellow";
  }
  else if (depth < 8) {
    return "lime";
  }
  else {
    return "orange";
  }
};


// RETRIEVING DATA & CREATE MAP
//================================

  // Grabbing our earthquake data
  d3.json(queryUrl, function(data) {
    // console.log(data)
  
    // Creating a geoJSON layer with the retrieved data
    var earthquakes = L.geoJSON(data.features, {
      pointToLayer: addCircleMarker,
      onEachFeature: addPopup
      
  }); 
  
  // Sending earthquakes layer to the createMap function
  createMap(earthquakes);

}); 


// function that creates Circle markers on the map
function addCircleMarker(feature, location){

  // Change the values of these options to change the symbol's appearance
    var markerOptions = {
      radius: markerSize(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker(location, markerOptions );
  };


  // function to add popups to the circle markers to display data details
function addPopup(feature, layer) {
  // popup will include the place and time of the earthquake (found in the data array)
  return layer.bindPopup(`<h3> ${feature.properties.place} </h3>  <h4>Magnitude: ${feature.properties.mag} </h4><h4>Depth: ${feature.geometry.coordinates[2]}</h4> <p> ${Date(feature.properties.time)} </p>`);
}

// function to plot the markers to the map
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });


// LEGEND
// =========================================

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  // Add a legend to the map
  legend.onAdd = function(myMap){
    // create div for legend
    var div = L.DomUtil.create("div", "info legend");
    grades = [0, 2, 4, 6, 8]
    labels = ['<strong>Earthquake</strong>'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};
legend.addTo(myMap);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}