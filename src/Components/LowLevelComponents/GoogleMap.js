import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import PropTypes from "prop-types";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: null,
      lat: null
    };
  }
  componentDidMount() {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: this.props.address }, (results, status) => {
      if (status == "OK") {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      } else {
        this.setState({
          lat: 39.913818,
          lng: 116.363625
        });
      }
    });
  }
  render() {
    const { lat, lng } = this.state;
    return lat && lng ? (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
        {this.props.isMarkerShown && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    ) : (
      ""
    );
  }
}

MapComponent.propTypes = {
  address: PropTypes.string.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};

export default compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwe3BjSb591bmUMeaxMxRJSh4pKOzphfM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "158px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapComponent);
