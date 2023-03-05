import { useCloudinaryContext } from "../../context/CloudinaryContext";
import loadingImg from "../../imgs/loading-img.webp";

const ShowImage = () => {
  const { url } = useCloudinaryContext();
  return (
    <div>
      {!url ? (
        <img src={loadingImg} alt="Loading image" />
      ) : (
        <img src={url} alt={url} />
      )}
    </div>
  );
};
export default ShowImage;
