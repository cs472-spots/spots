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
      spotIndex: _({type: 'number'})
    };
  },

  actions: {
    sample: function(guest) {
      console.log("this action does nothing");
    },
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
    }
  }
})

export default sessionSlice
