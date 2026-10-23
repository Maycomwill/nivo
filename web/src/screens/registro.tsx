import RegisterForm from "@/components/forms/register";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function Registro() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full flex-1 items-start justify-start p-4">
      <section className="flex w-full items-center justify-start">
        <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
          <ArrowLeft />
        </Button>
      </section>
      <div className="flex w-full flex-1 mt-12">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Registro;
