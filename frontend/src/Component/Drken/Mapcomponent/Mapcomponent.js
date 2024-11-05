import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Mapcomponent.css"; // Import CSS for styling

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Array of locations
  const locations = [
    {
      title: "Fellowship in Scoliosis and Spinal Surgery",
      description: "The Hospital for Special Surgery, New York, New York",
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      title: "Fellowship in Minimally Invasive Spinal Surgery",
      description: "California Center for Minimally Invasive Spine Surgery, Thousand Oaks, California",
      lat: 34.1706,
      lng: -118.8376,
    },
    {
      title: "Orthopaedic Surgery Residency Training",
      description: "King/Drew Medical Center, Los Angeles, California",
      lat: 34.0182,
      lng: -118.2115,
    },
    {
      title: "General Surgery Training",
      description: "Mount Sinai Hospital, New York, New York",
      lat: 40.7901,
      lng: -73.9523,
    },
    {
      title: "Fellowship in Orthopedic Biomechanics",
      description: "The Hospital for Special Surgery, New York, New York",
      lat: 40.7128,
      lng: -74.0060,
    },
  ];

  // Initialize the Map on component mount
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.0060, 40.7128], // Default center: New York
      zoom: 10,
      pitch: 45,
      bearing: -17.6,
    });

    // Add navigation control (zoom, rotate)
    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  // Handle list item click to jump to location
  const handleLocationClick = (lat, lng) => {
    map.current.flyTo({
      center: [lng, lat],
      zoom: 15,
      speed: 0.8,
      curve: 1,
      pitch: 60,
      essential: true,
    });
  };

  return (
    <div className="map-container">
      <div className="map" ref={mapContainer}></div>
      <div className="locations-list">
        <ul>
          {locations.map((location, index) => (
            <li key={index} onClick={() => handleLocationClick(location.lat, location.lng)}>
              <b>{location.title}</b>
              <p>{location.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
