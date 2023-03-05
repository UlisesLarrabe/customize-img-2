import "./App.css";
import ChangeImageContainer from "./components/ChangeImageContainer/ChangeImageContainer";
import { CloudinaryProvider } from "./context/CloudinaryContext";

function App() {
  return (
    <CloudinaryProvider>
      <div>
        <ChangeImageContainer />
      </div>
    </CloudinaryProvider>
  );
}

export default App;
