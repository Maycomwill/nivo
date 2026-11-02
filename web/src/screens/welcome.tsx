// import ThemeSwitch from "@/functions/theme_switch";
import { Button } from "@/components/ui/button";
import NivoLogo from "@/nivo.svg";
import { Link } from "react-router";
function Welcome() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden p-4">
      <section
        id="hero"
        className="relative flex w-full flex-1 flex-col items-center justify-center"
      >
        <div className="absolute size-112 animate-[spin_180s_infinite] rounded-full border border-emerald-800/60 bg-transparent" />
        <div className="border-scooter-800/60 shimmer-reverse absolute size-96 animate-[spin_180s_infinite] rounded-full border border-dashed bg-transparent" />
        <div className="absolute size-80 rounded-full border border-emerald-400/20 bg-emerald-400/5 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] delay-700" />
        <div className="absolute">
          <div className="relative size-80 animate-[spin_120s_linear_infinite] rounded-full bg-transparent">
            <div className="absolute left-1/2 z-0 size-2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-teal-600 bg-transparent" />
            <div className="absolute left-1/2 z-0 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600" />
          </div>
        </div>
        <div className="absolute size-64 animate-pulse rounded-full bg-teal-900/20" />
        <div className="absolute size-48 animate-pulse rounded-full border border-teal-800/40 bg-teal-900/40 delay-1000" />
        <div className="animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] absolute size-32 rounded-full bg-teal-900/70 delay-100" />
        <div className="absolute top-[5%] -right-20 z-0 size-72 -translate-y-1/2 animate-[pulse_50s_infinite] rounded-full bg-emerald-300 blur-[96px] dark:bg-emerald-300/20" />
        <div className="absolute top-[20%] right-40 z-0 size-28 -translate-y-1/2 animate-[pulse_30s_infinite] rounded-full bg-teal-500 blur-3xl dark:bg-teal-500/30" />
        <img
          className="z-10  size-20 drop-shadow-md duration-150 ease-in-out hover:scale-105"
          src={NivoLogo}
        />
      </section>

      <div className="z-10 flex h-full w-full flex-col items-start justify-end space-y-2 pt-4">
        <p className="text-center text-5xl bg-background">
          Organize-se de maneira inteligente.
        </p>
        <p className="text-justify text-sm dark:text-slate-500">
          Chega de planilhas e gastar horas por dia para organizar suas finanças
          pessoais.
          <br />
          <span>
            Com uma interface fácil e intuitiva, organize as finanças, defina
            suas metas e acompanhe seu progresso.
          </span>
        </p>
      </div>
      <div className="mt-8 mb-4 flex w-full items-center justify-center">
        <Button className="w-full" size={"lg"} variant={"default"}>
          <Link className="w-full" to={"/login"}>
            Começar
          </Link>
        </Button>
      </div>
      <div className="mb-4 flex w-full items-center justify-center space-x-1">
        <p className="text-xs dark:text-slate-500">
          Se ainda não possui uma conta.
        </p>
        <Link
          className="text-xs duration-150 ease-in-out dark:text-teal-400 dark:hover:text-teal-500"
          to={"/registro"}
        >
          Registre-se
        </Link>

      </div>
    </div>
  );
}

export default Welcome;
