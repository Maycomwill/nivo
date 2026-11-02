import { BrowserRouter } from "react-router";
import "./App.css";
import CustomRouter from "./routes";
import { cn } from "cn";

function App() {
  return (
    <>
      <div
        className={cn(
          "bg-background text-foreground flex min-h-screen w-full flex-col items-start justify-start scroll-smooth antialiased",
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
