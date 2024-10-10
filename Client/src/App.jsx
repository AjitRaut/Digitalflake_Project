import { Provider } from "react-redux";
import { store } from "./App/store";
import "./App.css";
import Navbar from "./Component/Home/Navbar";
import MainContent from "./Component/Home/Maincontent";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <MainContent/>
    </Provider>
  );
}

export default App;
