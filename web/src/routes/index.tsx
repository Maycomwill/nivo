import { Route, Routes } from "react-router";
import Home from "../screens/home";

function CustomRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default CustomRouter;
