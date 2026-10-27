import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function HomeFilter() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log(params);
    setParams({
      month: String(date.getMonth() + 1),
      year: String(date.getFullYear()),
    });
  }, [date]);

  function handleSelect(data: Date | undefined) {
    console.log(data);
    if (data === undefined) {
      return setOpen(false);
    }
    setDate(data);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size={"icon-xl"} variant={"ghost"} className="rounded-full">
            <FilterIcon className="size-7" color="#60f3af" />
          </Button>
        }
      ></DialogTrigger>
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
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HomeFilter;
