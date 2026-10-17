// import ThemeSwitch from "@/functions/theme_switch";
import { Button } from "@/components/ui/button";
import NivoLogo from "../../public/nivo.svg";
import { Link } from "react-router";
function Welcome() {
  return (
    <>
      <section
        id="hero"
        className="flex w-full flex-col items-start justify-center"
      >
        <img
          className="size-16 duration-150 ease-in-out hover:scale-105"
          src={NivoLogo}
        />
      </section>
      <div className="flex h-full w-full flex-1 flex-col items-start justify-end space-y-2">
        <p className="text-5xl text-slate-200">
          Rastreie suas Despesas Rapidamente.
        </p>
        <p className="text-sm text-slate-500">
          Chega de planilhas e gastar horas por dia para organizar suas finanças
          pessoais. Com uma interface fácil e intuitiva, organize as finanças,
          defina suas metas e acompanhe seu progresso.
        </p>
      </div>
      <div className="mt-8 mb-4 flex w-full items-center justify-center">
        <Button className="w-full" size={"lg"} variant={"default"}>
          <Link className="w-full" to={"/login"}>
            Começar
          </Link>
        </Button>
      </div>
      <div className="mb-8 flex w-full items-center justify-center space-x-1">
        <p className="text-xs text-slate-500">Se ainda não possui uma conta.</p>
        <Link
          className="text-xs text-slate-500 duration-150 ease-in-out hover:text-slate-200"
          to={"/registro"}
        >
          Registre-se
        </Link>
      </div>
    </>
  );
}

export default Welcome;
