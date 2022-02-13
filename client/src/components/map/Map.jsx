// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import React from 'react'

function handleClick(){
	const div = document.createElement("div")
	div.id = "map"
	
	const script = document.createElement("script")
	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCK0I4uHlhSrGYLKddSvFqe23MHI-IOfSk&callback=initAutocomplete&libraries=places&v=weekly"
	
	document.body.appendChild(div)
	document.body.appendChild(script)
	
	const btn = document.getElementById('btn')
	btn.remove()
	
}

function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0994876528033, lng: 34.78191091879967 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  
  let infoWindow = new google.maps.InfoWindow({
    content: "לחץ על המפה על מנת לבחור את מיקומו של הקבר",
    position: { lat: 32.0994876528033, lng: 34.78191091879967 },
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
	
	const location = JSON.stringify(mapsMouseEvent.latLng.toJSON())
	document.getElementById('location').value = location
	console.log(location)
  });
  
  const locationButton = document.createElement("button");

  locationButton.textContent = "כוון את המפה לכיוונך הנוכחי";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
  
}

const Map = () => {
  return(
    <div>
      
    <button id="btn" onclick={handleClick}>קבע את מיקום הקבר</button>
    <input
    id="pac-input"
    class="controls"
    type="text"
    placeholder="היכן ממוקם הקבר?"
    />
      <form action="/graveLocation/:id" method="post" >
      <input type="hidden" value="" id="location" />
      <input type="submit" />
      </form>
    </div>
  )
}

export default Map;