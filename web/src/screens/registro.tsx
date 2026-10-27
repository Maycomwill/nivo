import RegisterForm from "@/components/forms/register";
import ScreenLoading from "@/components/screen_loading";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { cn } from "cn";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import NivoLogo from "@/nivo.svg";

function Registro() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  return (
    <>
      {loading && <ScreenLoading />}
      <div
        className={cn(
          "relative z-0 flex w-full flex-1 flex-col items-center justify-start overflow-hidden scroll-smooth p-4",
          loading && "blur-xs",
        )}
      >
        <div className="bg-aquamarine-300/30 absolute top-[5%] -right-20 z-10 size-52 -translate-y-1/2 animate-[pulse_10s_linear_infinite,right-arc_3s_linear_infinite] rounded-full blur-[96px]" />
        <div className="bg-scooter-500/50 direction-alternate absolute top-[20%] right-40 z-10 size-28 -translate-y-1/2 animate-[pulse_5s_linear_infinite,left-arc_5s_linear_infinite] rounded-full blur-3xl" />
        <section className="flex w-full items-center justify-start">
          <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
        </section>
        <div className="flex w-full flex-col items-center justify-start pt-12">
          <div className="flex w-full flex-col">
            <section className="flex items-center justify-center">
              <img className="size-16" src={NivoLogo} />
            </section>
            <section className="mt-2 flex flex-col items-center justify-center">
              <span className="text-slate-50">Crie sua conta</span>
              <span className="text-center text-sm text-slate-100/35">
                Nivo, sua forma intuitiva de organização financeira
              </span>
            </section>
          </div>
        </div>
        <div className="flex w-full flex-1 pt-8">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Registro;
