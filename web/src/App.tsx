import { BrowserRouter } from "react-router";
import "./App.css";
import CustomRouter from "./routes";
import { cn } from "cn";

function App() {
  return (
    <>
      <div
        className={cn(
          "flex min-h-screen w-full flex-col items-start justify-start bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        )}
      >
        <BrowserRouter>
          <CustomRouter />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
