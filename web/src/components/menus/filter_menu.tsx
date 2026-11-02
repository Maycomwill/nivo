import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryIcons from "../category_icons";

function FilterMenu() {
  const [periodOpen, setPeriodOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [, setParams] = useSearchParams();
  const [date, setDate] = useState(new Date());
  const categories = [
    { label: "salário", value: "salário" },
    { label: "contas", value: "contas" },
    { label: "investimentos", value: "investimentos" },
    { label: "cartão", value: "cartão" },
    { label: "alimentação", value: "alimentação" },
    { label: "compras", value: "compras" },
    { label: "carro", value: "carro" },
    { label: "moto", value: "moto" },
    { label: "outros", value: "outros" },
    { label: "financiamento", value: "financiamento" },
  ];

  useEffect(() => {
    setParams((params) => {
      params.set("month", String(date.getMonth() + 1));
      params.set("year", String(date.getFullYear()));
      return params;
    });
  }, [date]);

  function handleClearCategories() {
    setParams((params) => {
      params.delete("category");
      return params;
    });
    return;
  }

  function handleCategoriesFilter(value: string | null) {
    console.log(value);
    if (value === null) {
      setParams((params) => {
        params.delete("category");
        return params;
      });
      return setCategoriesOpen(false);
    }
    setParams((params) => {
      params.set("category", value);
      return params;
    });
    return setCategoriesOpen(false);
  }

  function handleSelect(data: Date | undefined) {
    if (data === undefined) {
      return setPeriodOpen(false);
    }
    setDate(data);
    setPeriodOpen(false);
  }
  return (
    <>
      <Dialog open={periodOpen} onOpenChange={setPeriodOpen}>
        <DialogContent className={"flex w-full flex-col"}>
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Selecione o mês e ano
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Calendar
              mode="single"
              required
              selected={date}
              onSelect={(e) => handleSelect(e)}
              captionLayout="dropdown"
              className="w-full"
              timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <DialogContent className={"flex w-full flex-col"}>
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Selecione a categoria
            </DialogTitle>
          </DialogHeader>

          <Select onValueChange={handleCategoriesFilter} items={categories}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias: </SelectLabel>
                <SelectItem value={null}>Limpar</SelectItem>
                {categories.map(
                  (category: { label: string; value: string }) => {
                    const icon = CategoryIcons({ category: category.value });
                    return (
                      <SelectItem
                        className="flex w-full items-center justify-center gap-x-2"
                        key={category.value}
                        value={category.value}
                      >
                        {icon}
                        <span className="capitalize">{category.label}</span>
                      </SelectItem>
                    );
                  },
                )}
              </SelectGroup>
            </SelectContent>
            <div className="flex w-full items-center justify-evenly gap-x-4">
              <Button className={"flex flex-1"} onClick={handleClearCategories}>
                Limpar
              </Button>
            </div>
          </Select>
        </DialogContent>
      </Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={"aria-expanded:bg-muted aria-expanded:dark:bg-primary"}
          render={<Button aria-haspopup="true" size="icon" variant="ghost" />}
        >
          <FilterIcon className="size-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Filtros disponíveis</DropdownMenuLabel>
            <DropdownMenuItem>
              <Button
                className={"w-full text-center"}
                variant={"ghost"}
                onClick={() => setCategoriesOpen(true)}
              >
                Categorias
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className={"w-full text-center"}
                variant={"ghost"}
                onClick={() => setPeriodOpen(true)}
              >
                Período
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default FilterMenu;
