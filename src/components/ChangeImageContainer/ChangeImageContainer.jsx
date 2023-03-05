import DropImageContainer from "./DropImageContainer/DropImageContainer";
import "../../scss/ChangeImageContainer.scss";
import { useReducer, useState } from "react";
import {
  formReducer,
  INITIAL_STATE,
} from "../../hooks/useTransformationReducer";
import ChangeImage from "./ChangeImage/ChangeImage";
import { useCloudinaryContext } from "../../context/CloudinaryContext";

const ChangeImageContainer = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [carg, setCarg] = useState(false);
  const { uploadTheImage } = useCloudinaryContext();

  const handleClick = () => {
    setCarg(true);
    uploadTheImage(state.image);
  };
  return (
    <div className="change-image-cont">
      <h1 className="text-white text-4xl font-bold mb-8 mt-10">Welcome to Styleit!</h1>

      {!carg ? (
        <div>
          <DropImageContainer dispatch={dispatch} state={state}/>
          {state.image && (
            <button onClick={handleClick} className="btn btn-active btn-primary">
              Lets start!
            </button>
          )}
        </div>
      ) : (
        <ChangeImage dispatch={dispatch} state={state} />
      )}
    </div>
  );
};
export default ChangeImageContainer;
