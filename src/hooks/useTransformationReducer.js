export const INITIAL_STATE = {
  height: 600,
  width: 800,
  pixelation: 20,
  image: "",
  brightness: 30,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: parseInt(action.payload.value),
      };
    case "TRANSFORM":
      return { ...state, loader: true };

    case "CHANGE_IMAGE":
      return { ...state, image: action.payload.value };

    default:
      return state;
  }
};
