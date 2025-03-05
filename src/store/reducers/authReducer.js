const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
