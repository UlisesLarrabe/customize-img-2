import { useEffect, useReducer, useState } from "react";
import { useCloudinaryContext } from "../../../context/CloudinaryContext";
import {
  formReducer,
  INITIAL_STATE,
} from "../../../hooks/useTransformationReducer";
import "../../../scss/ChangeImage.scss";
import ShowImage from "../../ShowImage/ShowImage";
const ChangeImage = () => {
  const { effects, getFunction, functionName, url, resetImage } =
    useCloudinaryContext();
  const [effect, setEffect] = useState({});
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [inputs, setInputs] = useState([]);

  const handleEffect = (ef) => {
    setEffect(ef);
  };

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  useEffect(() => {
    const newInputs = effect.inputs;
    if (newInputs) {
      setInputs(newInputs);
    } else {
      setInputs(false);
    }
    getFunction(effect.funct);
  }, [effect]);

  const handleSetChanges = () => {
    dispatch({ type: "TRANSFORM" });

    switch (effect.funct) {
      case "pixelFace":
        functionName.function(url, state.pixelation);
        break;

      case "imageBrightness":
        functionName.function(url, state.brightness);
        break;

      default:
        functionName.function(url, state.width, state.height);
        break;
    }
  };

  const handleUndoChange = () => {
    resetImage();
  };

  return (
    <>
      <div className="menu-effects bg-base-100">
        <ul>
          {effects.map((ef) => (
            <li onClick={() => handleEffect(ef)} key={ef.id} className="font-bold">
              {ef.effect}
            </li>
          ))}
        </ul>
      </div>

      <section className="image-change">
        <div className="set-effects">
          {effect && (
            <div className="cont">
              <h2 className="text-xl text-white mt-5 font-bold">
                {effect.effect}
              </h2>
              {inputs && (
                <div className="div-gen">
                  {inputs.map((ef) => (
                    <div className="div-inputs mt-10" key={ef.name}>
                      <label
                        key={ef.name}
                        htmlFor={ef.name}
                        className="text-white"
                      >
                        {ef.name.toUpperCase()}
                      </label>
                      <input
                        type={ef.type}
                        name={ef.name}
                        id={ef.id}
                        onChange={handleChange}
                        className="input input-bordered input-info"
                      />
                    </div>
                  ))}
                </div>
              )}{" "}
              {!functionName && (
                <div className="div-gen h-full font-bold text-xl">
                  <h2 className="mt-20 text-white">
                    Select an effect to start
                  </h2>
                </div>
              )}
              <div className="but">
                {functionName && (
                  <button
                    onClick={handleSetChanges}
                    className="btn btn-outline btn-success "
                  >
                    Set changes
                  </button>
                )}
                {functionName && (
                  <button
                    onClick={handleUndoChange}
                    className="btn btn-outline btn-warning "
                  >
                    Reset picture
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="show-image">
        <ShowImage />
      </div>
      <a
        className="btn btn-outline btn-accent mt-10 mb-10"
        href={url}
        target="_blank"
      >
        See full image
      </a>
    </>
  );
};
export default ChangeImage;
