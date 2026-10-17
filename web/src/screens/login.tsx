import NivoLogo from "/nivo.svg";
import LoginForm from "@/components/forms/login";

function login() {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center">
      <section>
        <img className="size-60" src={NivoLogo} />
      </section>
      <section className="w-full">
        <LoginForm />
      </section>
    </div>
  );
}

export default login;
