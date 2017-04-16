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
  }
})

export default sessionSlice
