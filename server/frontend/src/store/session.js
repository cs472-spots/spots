import {createSlice} from 'nectarine';

const sessionSlice = createSlice({
  schema: (_) => {
    return {
      profile: {
        firstName: _({type: 'string'}),
        lastName: _({type: 'string'})
      },
      socket: _
    };
  },

  actions: {
    sample: function(guest) {
      console.log("this action does nothing");
    }
    //need to create an action to get profile name
    //problem is waiting for $set to finish before using $get
  }
})

export default sessionSlice
