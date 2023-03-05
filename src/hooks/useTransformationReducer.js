export const INITIAL_STATE = {
  height: 400,
  width: 600,
  pixelation: 20,
  image: "",
  loader: false,
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

    case "ERROR":
      return { ...state, error: action.payload.value };

    case "LOADER":
      return { ...state, loader: action.payload.value };

    default:
      return state;
  }
};
