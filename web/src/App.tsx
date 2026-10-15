import { BrowserRouter } from "react-router";
import "./App.css";
import CustomRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <CustomRouter />
    </BrowserRouter>
  );
}

export default App;
