import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.email({ error: "Digite um e-mail no formato correto" }),
  password: z.string().min(8, "A senha deve ter ao menos 8 caracteres."),
  remember: z.boolean(),
});

function LoginForm() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(payload: z.infer<typeof formSchema>) {
    // console.log("Submit", payload);
    handleLogin(payload);
    navigate("/");
    return;
  }

  return (
    <div className="w-full">
      <form
        id="login-hook-form"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="flex w-full flex-col items-start justify-center space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-full">
                  <FieldLabel htmlFor="email">E-mail:</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="email"
                    className="w-full"
                    placeholder="john@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="relative w-full">
                  <FieldLabel htmlFor="password-use-form">Senha:</FieldLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="password"
                    className="w-full"
                    placeholder="********"
                    autoComplete="off"
                    min={8}
                  />
                  <div className="absolute top-[45%] right-0 left-1/2 flex w-4 -translate-x-4 translate-y-1/2 items-center justify-center">
                    <Button
                      className="size-4"
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="remember"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex w-full" orientation={"horizontal"}>
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="remember"
                  />
                  <FieldLabel className="w-full" htmlFor="remember">
                    Lembre de mim por 30d.
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field>
            <Button type="submit">Enviar</Button>
          </Field>
        </section>
      </form>
    </div>
  );
}

export default LoginForm;
