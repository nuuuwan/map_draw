import { Component } from "react";
import { CircleMarker, Polyline } from "react-leaflet";
import GeoMap from "../molecules/GeoMap.js";
import LatLng from "../../base/LatLng.js";

import "./HomePage.css";

const DEFAULT_ZOOM = 15;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const DEFAULT_CIRLE_RADIUS = 5;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [], distance: 0 };
  }
  onClick(e) {
    const { lat, lng } = e.latlng;
    let { points } = this.state;
    points.push([lat, lng]);
    const distance = LatLng.getMultiPointDistance(points);
    this.setState({ points, distance });
  }
  render() {
    const { points, distance } = this.state;
    const pathOptionsLine = {
      color: "red",
    };
    const pathOptions = {
      color: "red",
      fill: true,
      fillColor: "white",
      fillOpacity: 0.9,
    };

    const distanceStr = distance.toFixed(2);

    return (
      <div className="div-home-page">
        <div className="div-info">
          <label>Distace:</label>
          {` ${distanceStr} km`}
          <div className="div-points">
            {JSON.stringify(
              points.map((point) => point.map((x) => parseFloat(x.toFixed(4))))
            )}
          </div>
        </div>
        <GeoMap
          center={DEFAULT_LATLNG}
          zoom={DEFAULT_ZOOM}
          onClick={this.onClick.bind(this)}
        >
          <Polyline positions={[points]} pathOptions={pathOptionsLine} />
          {points.map(function (point, i) {
            const key = `circle-${i}`;
            return (
              <CircleMarker
                key={key}
                center={point}
                radius={DEFAULT_CIRLE_RADIUS * 2}
                pathOptions={pathOptions}
              />
            );
          })}
        </GeoMap>
      </div>
    );
  }
}
