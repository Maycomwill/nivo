import { Route, Routes } from "react-router";
import Welcome from "../screens/welcome";
import Login from "@/screens/login";
import useAuth from "@/hooks/useAuth";
import Home from "@/screens/home";

function CustomRouter() {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route index element={auth ? <Home /> : <Welcome />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default CustomRouter;
