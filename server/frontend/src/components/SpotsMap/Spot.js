import React from 'react';

const Spot = ({text}) => {
  return (
    <div style={
      {
        position: 'relative',
        color: 'white',
        background: 'red',
        height: 15,
        width: 40,
        top: -20,
        left: -30,
      }
    }>
      {text}
    </div>
  )
}

export default Spot;
