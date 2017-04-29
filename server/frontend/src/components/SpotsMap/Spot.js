import React from 'react';
import Styles from './Styles';

const Spot = ({text}) => {
  return (
    <div style={Styles.notVacant}>
      {text}
    </div>
  )
}

export default Spot;
