import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropImageContainer = ({ dispatch, state }) => {
  const onDrop = useCallback((acceptedFiles) => {
    dispatch({ type: "CHANGE_IMAGE", payload: { value: acceptedFiles[0] } });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-drop">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Yes, here!</p>
      ) : (
        <div>
          {state.image ? (
            <p>Your image is prepared!</p>
          ) : (
            <>
              <p>Drop the file here ...</p>{" "}
              <button className="btn btn-outline btn-info mt-10">Or click here</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default DropImageContainer;
