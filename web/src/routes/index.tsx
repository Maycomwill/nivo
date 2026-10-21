import { Route, Routes } from "react-router";
import Welcome from "../screens/welcome";
import Login from "@/screens/login";
import useAuth from "@/hooks/useAuth";
import Home from "@/screens/home";
import Registro from "@/screens/registro";

function CustomRouter() {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route index element={auth ? <Home /> : <Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default CustomRouter;
