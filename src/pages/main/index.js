import React, { Fragment } from 'react';

import LeftBar from '../../components/LeftBar';
import AddUser from '../../components/ModalMap';
import Map from '../../components/Map';

const Main = () => (
  <Fragment>
    <Map />
    <LeftBar />
    <AddUser />
  </Fragment>
);

export default Main;
