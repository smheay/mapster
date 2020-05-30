import React, { Component } from "react";
import mapboxgl from "mapbox-gl";




require('dotenv').config();


/* 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;  */
mapboxgl.accessToken = "pk.eyJ1Ijoic21oZWF5IiwiYSI6ImNrYTQ1NGd0OTA1aXUzdG5pZ3k3bGc2ODAifQ.CFQIzurf-qKXYJCH7JA7Ng";

export default class Mapbox extends Component {
  mapRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      lng: -122.6863,
      lat: 45.5085,
      zoom: 1.5,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-122.6863, 45.5085],
      zoom: 16,

    });


    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }


  render() {
    return (
      <div className="mapContainer2 bg-dark">
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
