import { Cloudinary } from "@cloudinary/url-gen";
import { brightness } from "@cloudinary/url-gen/actions/adjust";
import {
  backgroundRemoval,
  pixelate,
} from "@cloudinary/url-gen/actions/effect";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { faces } from "@cloudinary/url-gen/qualifiers/region";
import { createContext, useContext, useState } from "react";

export const CloudinaryContext = createContext();

export const useCloudinaryContext = () => {
  const context = useContext(CloudinaryContext);
  return context;
};

export function CloudinaryProvider({ children }) {
  const [url, setUrl] = useState("");
  const [theImage, setTheImage] = useState("");

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDNAME,
    },
    url: {
      secure: true,
    },
  });

  const uploadToCld = (image, doFunction) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);

        doFunction(data.public_id);
      })
      .catch((error) => console.log(error));
  };

  const uploadTheImage = (image) => {
    setTheImage(image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setTheImage(data.url);
      })
      .catch((error) => console.log(error));
  };

  const removeBackImage = (image) => {
    const removeTheBackground = (data) => {
      const myImage = cloudinary.image(data);
      myImage.effect(backgroundRemoval());
      const myUrl = myImage.toURL();
      setUrl(myUrl);
    };

    uploadToCld(image, removeTheBackground);
  };

  const resizeFillImage = (image, width, height) => {
    const resizeTheFillImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(fill().width(width).height(height));
      const myUrl = myImage.toURL();
      setUrl(myUrl);
    };

    uploadToCld(image, resizeTheFillImage);
  };

  const resizeImage = (image, width, height) => {
    const resizeTheImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(scale().width(width).height(height));
      const myUrl = myImage.toURL();
      setUrl(myUrl);
    };

    uploadToCld(image, resizeTheImage);
  };

  const profileImage = (image) => {
    const profileTheImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(fill().width(170).height(170)).roundCorners(max());
      const myUrl = myImage.toURL();
      setUrl(myUrl);
    };

    uploadToCld(image, profileTheImage);
  };

  const pixelFace = (image, pixelation) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        const myImage = cloudinary.image(data.public_id);
        myImage.effect(pixelate().squareSize(pixelation).region(faces()));
        const myUrl = myImage.toURL();
        setUrl(myUrl);
      });
  };

  const imageBrightness = (image, brightnessLevel) => {
    const imageTheBrightness = (data) => {
      const myImage = cloudinary.image(data);
      myImage.adjust(brightness().level(brightnessLevel));
      const myUrl = myImage.toURL();
      setUrl(myUrl);
    };

    uploadToCld(image, imageTheBrightness);
  };

  
  const effects = [
    {
      effect: "Remove image's background",
      id: 0,
      funct: removeBackImage,
      nameFunct: "removeBackImage",
      inputs: false,
    },
    {
      effect: "Resize an image to fill given dimensions",
      id: 1,
      funct: resizeFillImage,
      nameFunct:"resizeFillImage",
      inputs: [
        { type: "number", name: "height", rec:600 },
        { type: "number", name: "width", rec:800 },
      ],
    },
    {
      effect: "Resize an image",
      id: 2,
      funct: resizeImage,
      nameFunct:"resizeImage",
      inputs: [
        { type: "number", name: "height",  rec:600  },
        { type: "number", name: "width",  rec:800  },
      ],
    },
    {
      effect: "Convert image into profile image",
      info: "Convert your images to a profile image",
      id: 3,
      funct: profileImage,
      nameFunct:"profileImage",
      input: false,
    },
    {
      effect: "Pixelate faces",
      info: "Hide faces in your images",
      id: 4,
      funct: pixelFace,
      nameFunct:"pixelFace",
      inputs: [{ type: "number", name: "pixelation", rec:20 }],
    },
    {
      effect: "Adjust image brightness",
      info: "Adjust the brightness of an image",
      id: 5,
      funct: imageBrightness,
      nameFunct:"imageBrightness",
      inputs: [{ type: "number", name: "brightness", rec:30 }],
    },
  ];

  const resetImage = () => {
    setUrl(theImage);
  };

  return (
    <CloudinaryContext.Provider
      value={{
        url,
        effects,
        uploadTheImage,
        resetImage,
      }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
}
