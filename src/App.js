import "./App.css";
import ChangeImageContainer from "./components/ChangeImageContainer/ChangeImageContainer";
import Footer from "./components/FooterContainer/FooterContainer";
import { CloudinaryProvider } from "./context/CloudinaryContext";

function App() {
  return (
    <CloudinaryProvider>
      <div className="div-app">
        <ChangeImageContainer />
        <Footer/>
      </div>
    </CloudinaryProvider>
  );
}

export default App;
