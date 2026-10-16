// import ThemeSwitch from "@/functions/theme_switch";
import { Button } from "@/components/ui/button";
import NivoLogo from "../../public/nivo.svg";
import { Link } from "react-router";
function Home() {
  return (
    <>
      <section
        id="hero"
        className="w-full flex items-start justify-center flex-col"
      >
        <img
          className="size-16 hover:scale-105 ease-in-out duration-150"
          src={NivoLogo}
        />
      </section>
      <div className="w-full h-full flex-1 flex flex-col items-start justify-end space-y-2">
        <p className="text-5xl text-slate-200">
          Rastreie suas Despesas Rapidamente.
        </p>
        <p className="text-sm text-slate-500">
          Chega de planilhas e gastar horas por dia para organizar suas finanças
          pessoais. Com uma interface fácil e intuitiva, organize as finanças,
          defina suas metas e acompanhe seu progresso.
        </p>
      </div>
      <div className="w-full items-center flex justify-center mt-8 mb-4">
        <Button className="w-full" size={"lg"} variant={"default"}>
          <Link className="w-full" to={"/login"}>Começar</Link>
        </Button>
      </div>
      <div className="w-full mb-8 items-center justify-center flex space-x-1">
        <p className="text-xs text-slate-500">Se ainda não possui uma conta.</p>
        <Link
          className="text-xs text-slate-500 hover:text-slate-200 ease-in-out duration-150"
          to={"/registro"}
        >
          Registre-se
        </Link>
      </div>
      {/* <ThemeSwitch/> */}
    </>
  );
}

export default Home;
