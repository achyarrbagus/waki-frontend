import React, { useState, useCallback, useContext } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import AppContext from "@/components/AppContext";
import Skeleton from "react-loading-skeleton";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};
const locationButton = null;

function Maps() {
  const context = useContext(AppContext);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyByA4JmAzwboAYv0ASRUjoHB2BWO02oKO8",
    libraries: ["places"],
    region: "id",
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // set location
      center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const bounds = new window.google.maps.LatLngBounds(center);
      const google_maps_geocoder = new window.google.maps.Geocoder();
      const infoWindow = [];
      const markers = [];
      // search box

      const input = document.getElementById("pac-input");
      const searchBox = new window.google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((markers) => {
          markers.setMap(null);
        });

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          context.setAddr(place.formatted_address);

          infoWindow.push(
            new window.google.maps.InfoWindow({
              position: place.geometry.location,
              content: place.formatted_address,
              map,
            }),
          );
          // Create a marker for each place.
          markers.push(
            new window.google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location,
            }),
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

      map.fitBounds(bounds);

      // add btn control
      locationButton = document.createElement("button");
      locationButton.textContent = "Get Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        locationButton,
      );

      // btn action
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // get address
            google_maps_geocoder.geocode(
              { latLng: pos },
              function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  context.setAddr(results[0].formatted_address);
                  markers.forEach((markers) => {
                    markers.setMap(null);
                  });
                  infoWindow.push(
                    new window.google.maps.InfoWindow({
                      position: pos,
                      content: results[0].formatted_address,
                      map,
                    }),
                  );
                  markers.push(
                    new window.google.maps.Marker({
                      map,
                      position: pos,
                    }),
                  );
                  map.setCenter(pos);
                }
              },
            );
          });
        }
      });

      // get address
      google_maps_geocoder.geocode(
        { latLng: center },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK && results[0]) {
            console.log(results[0]);

            markers.forEach((markers) => {
              markers.setMap(null);
            });
            context.setAddr(results[0].formatted_address);
            infoWindow.push(
              new window.google.maps.InfoWindow({
                position: center,
                content: results[0].formatted_address,
                map,
              }),
            );
            markers.push(
              new window.google.maps.Marker({
                map,
                position: center,
              }),
            );
          }
        },
      );

      setMap(map);
    });
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      <input
        id="pac-input"
        className="pac-input pac-div justify-center"
        type="text"
        placeholder="Search Address"
      />
    </>
  ) : (
    <>
      <div className="p-4">
        <Skeleton count={1} height={405} />
        <Skeleton count={1} height={40} />
      </div>
    </>
  );
}

export default React.memo(Maps);
