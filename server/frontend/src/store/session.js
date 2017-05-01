import {createSlice} from 'nectarine';
import spotsObj from './tempSpots';

const sessionSlice = createSlice({
  schema: (_) => {
    return {
      profile: {
        firstName: _({type: 'string'}),
        lastName: _({type: 'string'})
      },
      spots: _({type: 'object'}),
      socket: _
    };
  },

  actions: {
    sample: function(guest) {
      console.log("this action does nothing");
    },
    setSpots: function () {
      this.slice.spots.$set(spotsObj);
    },
    getSpots: function() {
      return this.slice.spots.$get();
    }
  }
})

export default sessionSlice
