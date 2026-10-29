// import ThemeSwitch from "@/functions/theme_switch";
import { Button } from "@/components/ui/button";
import NivoLogo from "@/nivo.svg";
import { Link } from "react-router";
// import ThemeSwitch from "@/functions/theme_switch";
function Welcome() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden p-4">
      <section
        id="hero"
        className="relative flex w-full flex-1 flex-col items-center justify-center"
      >
        <div className="border-brilliant-rose-800/60 dark:border-aquamarine-800/60 absolute size-112 animate-[spin_180s_infinite] rounded-full border bg-transparent" />
        <div className="border-punch-800/60 dark:border-scooter-800/60 shimmer-reverse absolute size-96 animate-[spin_180s_infinite] rounded-full border border-dashed bg-transparent" />
        <div className="border-brilliant-rose-400/20 dark:border-aquamarine-400/20 absolute size-80 rounded-full border bg-transparent" />
        <div className="absolute">
          <div className="relative size-80 animate-[spin_120s_linear_infinite] rounded-full bg-transparent">
            <div className="border-punch-600 dark:border-scooter-600 absolute left-1/2 z-0 size-2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border bg-transparent" />
            <div className="bg-punch-600 dark:bg-scooter-600 absolute left-1/2 z-0 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </div>
        <div className="bg-brilliant-rose-400/20 absolute size-64 animate-pulse rounded-full dark:bg-slate-900/30" />
        <div className="border-punch-800/5 bg-punch-600/20 absolute size-48 animate-pulse rounded-full border dark:border-slate-800/50 dark:bg-slate-900/50" />
        <div className="bg-brilliant-rose-400/30 absolute size-32 animate-pulse rounded-full dark:bg-slate-900/80" />
        <div className="bg-aquamarine-300 dark:bg-aquamarine-300/20 absolute top-[5%] -right-20 z-0 size-72 -translate-y-1/2 animate-[pulse_50s_infinite] rounded-full blur-[96px]" />
        <div className="bg-scooter-500 dark:bg-scooter-500/30 absolute top-[20%] right-40 z-0 size-28 -translate-y-1/2 animate-[pulse_30s_infinite] rounded-full blur-3xl" />
        <img
          className="z-10 size-20 drop-shadow-md duration-150 ease-in-out hover:scale-105"
          src={NivoLogo}
        />
      </section>

      <div className="z-10 flex h-full w-full flex-col items-start justify-end space-y-2 bg-slate-950 pt-4">
        <p className="text-center text-5xl dark:text-slate-200">
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
        <Button
          className="bg-aquamarine-400 hover:bg-aquamarine-500 w-full"
          size={"lg"}
          variant={"default"}
        >
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
          className="dark:text-aquamarine-300 dark:hover:text-aquamarine-400 text-xs duration-150 ease-in-out"
          to={"/registro"}
        >
          Registre-se
        </Link>
        {/* <ThemeSwitch /> */}
      </div>
    </div>
  );
}

export default Welcome;
