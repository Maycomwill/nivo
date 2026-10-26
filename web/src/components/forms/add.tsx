import { categories, categoriesSchema, operationEnum } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryIcons from "../category_icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Checkbox } from "../ui/checkbox";
import useTransaction from "@/hooks/useTransaction";

const formSchema = z.object({
  amount: z.string(),
  category: categoriesSchema,
  description: z.string(),
  date: z.date(),
  operation: operationEnum,
  fixed: z.boolean(),
});

function AddTransactionForm() {
    const navigate = useNavigate();
  const { addTransaction } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      amount: "",
      category: "outros",
      date: new Date(),
      description: "",
      fixed: false,
      operation: "income",
    },
  });

  async function onSubmit(payload: z.infer<typeof formSchema>) {
    await addTransaction(payload);
    navigate(-1)
    return;
  }
  return (
    <div className="w-full">
      <form
        id="add-transaction-hook-form"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Erros de validação:", errors);
          console.log("Valores atuais:", form.getValues());
        })}
      >
        <section className="flex w-full flex-col items-start justify-center space-y-4">
          <FieldGroup>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-full">
                  <FieldLabel htmlFor="description">Descrição:</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="description"
                    className="w-full"
                    placeholder="Padaria"
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-full">
                  <FieldLabel htmlFor="amount">Quantia:</FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    id="amount"
                    className="w-full"
                    placeholder="100.00"
                    autoComplete="on"
                    required
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="operation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field {...field} className="w-full">
                  <FieldLabel htmlFor="operation">Tipo de operação:</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Entrada ou Saída" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"income"}>Entrada</SelectItem>
                        <SelectItem value={"expense"}>Saída</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field {...field} className="w-full">
                  <FieldLabel htmlFor="category">Categoria:</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Contas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category: string, index: number) => {
                          const icon = CategoryIcons({ category });
                          return (
                            <SelectItem
                              key={index}
                              className={
                                "flex items-center justify-center gap-x-2"
                              }
                              value={category}
                            >
                              {category}
                              {icon}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field {...field}>
                  <FieldLabel htmlFor="date">Data:</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                        />
                      }
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="fixed"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex w-full" orientation={"horizontal"}>
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="fixed"
                  />
                  <FieldLabel className="w-full" htmlFor="fixed">
                    Custo fixo
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

export default AddTransactionForm;
