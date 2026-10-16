import { BrowserRouter } from "react-router";
import "./App.css";
import CustomRouter from "./routes";

function App() {
  return (
    <div className="w-full min-h-screen text-slate-950 dark:text-slate-50 bg-slate-100 dark:bg-slate-950">
      <BrowserRouter>
        <CustomRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
