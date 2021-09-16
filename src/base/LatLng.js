const RADIUS_EARTH_KM = 6371;
const LOCATION_PRECISION = 6;

export default class LatLng {
  static degToRad(degValue) {
    return (degValue * Math.PI) / 180;
  }

  static getDistance([lat1Deg, lng1Deg], [lat2Deg, lng2Deg]) {
    const dLat = LatLng.degToRad(lat2Deg - lat1Deg);
    const dlng = LatLng.degToRad(lng2Deg - lng1Deg);
    const lat1 = LatLng.degToRad(lat1Deg);
    const lat2 = LatLng.degToRad(lat2Deg);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dlng / 2) * Math.sin(dlng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = RADIUS_EARTH_KM * c;
    return d;
  }

  static getMultiPointDistance(points) {
    /* eslint-disable no-unused-vars */
    const [distance, [prevLat, prevLng]] = points.reduce(
      function ([distance, [prevLat, prevLng]], [lat, lng]) {
        if (prevLat === undefined) {
          return [0, [lat, lng]];
        }
        return [
          distance + LatLng.getDistance([prevLat, prevLng], [lat, lng]),
          [lat, lng],
        ];
      },
      [0, [undefined, undefined]]
    );
    return distance;
  }

  static round([lat, lng]) {
    return [lat, lng].map( x => parseFloat(parseFloat(x).toFixed(LOCATION_PRECISION)));
  }
}
