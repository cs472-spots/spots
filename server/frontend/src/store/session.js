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
    getSpots: function() {
      this.slice.spots.$set(spotsObj);
      return this.slice.spots.$get();
    }
    //need to create an action to get profile name
    //problem is waiting for $set to finish before using $get
  }
})

export default sessionSlice
