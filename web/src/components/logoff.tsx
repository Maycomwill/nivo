import useAuth from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
function Logoff() {
  const { handleLogoff } = useAuth();
  return (
    <div>
      <Button size={"icon"} variant={"ghost"} onClick={handleLogoff}>
        <LogOutIcon />
      </Button>
    </div>
  );
}

export default Logoff;
