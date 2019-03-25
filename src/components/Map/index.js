import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import { Creators as ModalActions } from '../../store/ducks/modal';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

class Map extends Component {
  static propTypes = {
    users: PropTypes.shape({}).isRequired,
    showModal: PropTypes.func.isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.015054199999998,
      longitude: -50.405354599999995,
      zoom: 14,
    },
  };

  componentDidMount() {
    this.handleUserLocation();
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleUserLocation = () => {
    const { viewport } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        viewport: {
          ...viewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  };

  handleMapClick = async (e) => {
    const [latitude, longitude] = e.lngLat;
    const { showModal } = this.props;

    await showModal({ latitude, longitude });
  };

  render() {
    const { users } = this.props;
    const { viewport: viewportState } = this.state;
    return (
      <Fragment>
        <MapGL
          // eslint-disable-next-line react/destructuring-assignment
          {...viewportState}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZ2lvYmFzc2V0dG8iLCJhIjoiY2p0a2U2dmx0MzlvcDRibzNsZW54cWoyMCJ9.P7Aq4Z3quFE1nDbI4hR3rA"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {users.data.map(user => (
            <Marker
              latitude={user.cordinates.latitude}
              longitude={user.cordinates.longitude}
              key={user.id}
            >
              <img className="avatar" alt={`${user.name} Avatar`} src={user.avatar} />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);
const mapStateToProps = state => ({
  users: state.users,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
