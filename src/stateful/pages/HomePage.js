import { Component } from "react";
import { CircleMarker, Polyline } from "react-leaflet";
import { CopyToClipboard } from "react-copy-to-clipboard";

import GeoMap from "../molecules/GeoMap.js";
import LatLng from "../../base/LatLng.js";

import "./HomePage.css";

const DEFAULT_ZOOM = 15;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const DEFAULT_CIRLE_RADIUS = 3;
const LOCATION_PRECISION = 6;
const DISTANCE_PRECISION = 3;

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

    const pointsInfo = `${points.length} point(s) selected.`;
    const distanceStr = distance.toFixed(DISTANCE_PRECISION);
    const pointsStr = JSON.stringify(
      points.map((point) =>
        point.map((x) => parseFloat(x.toFixed(LOCATION_PRECISION)))
      )
    );

    const renderCopyToCB =
      points.length > 0 ? (
        <CopyToClipboard text={pointsStr}>
          <button className="button-copy-to-cb">Copy to Clipboard</button>
        </CopyToClipboard>
      ) : null;

    return (
      <div className="div-home-page">
        <div className="div-info">
          <div className="div-info-distance">
            <label>Distace:</label>
            {` ${distanceStr} km`}
          </div>
          <div className="div-points">
            <div className="div-points-info">{pointsInfo}</div>
            <div className="div-points-data">
              <textarea className="textarea-points" value={pointsStr} />
              {renderCopyToCB}
            </div>
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
