import initialState from './Action'
const personaje_1 = (state = initialState, action) => {
    switch (action.type) {
      case "player_1":
        return {
            ...state,
            player_1: action.payload,
            player_2: state.player_2
            };
    case "player_2":
        return {
            ...state,
            player_1: state.player_1,
            player_2: action.payload
            };
      default:
        return state;
    }
  };
export default (personaje_1); 
