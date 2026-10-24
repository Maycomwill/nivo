import { Link, useNavigate } from "react-router";
import NivoLogo from "@/nivo.svg";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/forms/login";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { cn } from "cn";
import ScreenLoading from "@/components/screen_loading";

function Login() {
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
        <div className="bg-aquamarine-300/30 absolute top-[5%] -right-20 z-10 size-52 -translate-y-1/2 animate-[pulse_10s_linear_infinite] rounded-full blur-[96px]" />
        <div className="bg-scooter-500/50 absolute top-[20%] right-40 z-10 size-28 -translate-y-1/2 animate-[pulse_5s_linear_infinite] rounded-full blur-3xl" />
        <section className="flex w-full items-center justify-start">
          <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
        </section>
        <div className="flex w-full flex-1 flex-col items-center justify-start pt-12">
          <div className="mb-16 flex w-full flex-col">
            <section className="flex items-center justify-center">
              <img className="size-16" src={NivoLogo} />
            </section>
            <section className="mt-2 flex flex-col items-center justify-center">
              <span className="text-slate-50">Acesse sua conta</span>
              <span className="text-center text-sm text-slate-100/35">
                Sua forma intuitiva de organização financeira
              </span>
            </section>
          </div>
          <section className="w-full">
            <LoginForm />
          </section>
          <div className="my-4 h-px w-full rounded-full bg-radial from-slate-500/60 via-slate-500/3 to-transparent" />
          <section className="">
            <p className="text-center text-xs text-slate-500">
              Ainda não possui conta?{" "}
              <span>
                <Link
                  className="text-xs text-slate-500 duration-150 ease-in-out hover:text-slate-200"
                  to={"/registro"}
                >
                  Registre-se
                </Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
