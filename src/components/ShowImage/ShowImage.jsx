import { useCloudinaryContext } from "../../context/CloudinaryContext"

const ShowImage = () => {
  const {url} = useCloudinaryContext()
  return (
    <div>
      <img src={url} alt={url} />
    </div>
  )
}
export default ShowImage