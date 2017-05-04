import {createSlice} from 'nectarine';

const sessionSlice = createSlice({
  schema: (_) => {
    return {
      profile: {
        firstName: _({type: 'string'}),
        lastName: _({type: 'string'})
      },
      spots: _({type: 'object'}),
      socket: _,
      spotIndex: _({type: 'number'}),
      notifications: _
    };
  },

  actions: {
    setSpots: function () {
      if(!!!this.slice.socket.$hasData()) {
        return new Error("socket is not set");
      }
      var socket = this.slice.socket.$get()
      socket.emit('client', {client:'Admin', flag:'get-spots'}, (spots) => {
        this.slice.spots.$set(spots);
      })
    },
    getSpots: function() {
      return this.slice.spots.$get();
    },
    setNotify: function() {
      var counter = 0;
      var spots = this.slice.spots.$get();
      Object.keys(spots).map((key, index) => {
        if(spots[key].authorized === false) {
          counter += 1;
        }
        return null;
      });
      this.slice.notifications.$set(counter);
    }
  }
})

export default sessionSlice
