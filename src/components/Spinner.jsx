import React, { Component } from 'react';
import loading from '../spinner.gif';

class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="spinner"/>
      </div>
    );
  }
}

export default Spinner;
