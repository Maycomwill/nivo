import { BrowserRouter } from "react-router";
import "./App.css";
import CustomRouter from "./routes";
import { cn } from "cn";
import useLoading from "./hooks/useLoading";
import ScreenLoading from "./components/screen_loading";

function App() {
  const { loading } = useLoading();
  return (
    <>
      {loading && <ScreenLoading />}
      <div
        className={cn(
          "flex min-h-screen w-full flex-col items-start justify-start bg-slate-100 p-4 text-slate-950 dark:bg-slate-950 dark:text-slate-50",
          loading && "blur-xs",
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
