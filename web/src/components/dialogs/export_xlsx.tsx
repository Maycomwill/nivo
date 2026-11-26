import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import useTransaction from "@/hooks/useTransaction";

function ExportXLSX() {
  const { createXLSXFile } = useTransaction();
  const [open, setOpen] = useState(false);
  function handleOpenDialog() {
    setOpen((prev) => !prev);
  }

  function handleExport() {
    createXLSXFile();
    setOpen((prev) => !prev);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={() => {
            return (
              <Button
                onClick={handleOpenDialog}
                aria-haspopup="true"
                size="icon"
                variant="ghost"
              >
                <DownloadIcon className="size-6" />
              </Button>
            );
          }}
        />
        <DialogContent className={"flex w-full flex-col"}>
          <DialogHeader>
            <DialogTitle className={"text-center"}>Exportar dados</DialogTitle>
          </DialogHeader>

          <div className="flex min-h-24 w-full flex-col items-center justify-center text-center">
            <span className="flex flex-1">
              Deseja exportar seus dados para uma planilha do Excel (XLSX)?
            </span>
            <div className="flex w-full items-center justify-between px-4">
              <Button onClick={handleExport}>Confirmar</Button>
              <Button onClick={() => setOpen(false)} variant={"destructive"}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExportXLSX;
