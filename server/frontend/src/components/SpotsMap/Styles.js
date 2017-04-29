const K_WIDTH = 3;
const K_HEIGHT = K_WIDTH * 3;

const Styles = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  notVacant: {
    position: 'relative',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #ff0000',
    borderRadius: K_HEIGHT,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },

  vacant: {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #2cc000',
    //borderRadius: K_HEIGHT,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  }
};

export default Styles;
