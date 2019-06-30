console.log("hello farahmarkers");
function createMap(restos) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create an overlayMaps object to hold the Restaurants layer
  var overlayMaps = {
    "Restaurants": restos
  };

  // Create the map object with options
  var mapM = L.map("mapM", {
    center: [40.735670, -73.868934],
    zoom: 12,
    layers: [lightmap, restos]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(mapM);

 } // commenting out to remove the create map function


// });


function createMarkers(response) {


    var url = "http://127.0.0.1:5000/markerData";

    d3.json(url, function(response) {
            console.log("-- Next line is the marker json data");
            console.log(response);
            });

    // // Initialize an array to hold restaurant markers
    var restosMarkers = [];
    console.log("-- Next line is the restosMarkers list.   Should be empty");
    console.log(restosMarkers);
  
    // Loop through the stations array
    for (var i = 0; i < response.length; i++) {
      var locations = response[i];
  
      // For each station, create a marker and bind a popup with the station's name
      var restoMarker = L.marker([locations.lat, locations.long])
        .bindPopup("<h3>" + locations.DBA + "<h3><h3>Rating: " + locations.GRADE + "<h3>");
  
      // Add the marker to the bikeMarkers array
      restosMarkers.push(restoMarker);
    };
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(restosMarkers));
  };

d3.json("http://127.0.0.1:5000/markerData",createMarkers)
