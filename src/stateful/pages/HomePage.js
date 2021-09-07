import { Component } from "react";

import GeoMap from "../molecules/GeoMap.js";

export const DEFAULT_ZOOM = 15;
export const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  onClick(e) {
    console.log(e.latlng)
  }
  render() {
    return (
      <div className="div-home-page">
        <GeoMap
          center={DEFAULT_LATLNG}
          zoom={DEFAULT_ZOOM}
          onClick={this.onClick.bind(this)}
        ></GeoMap>
      </div>
    );
  }
}
