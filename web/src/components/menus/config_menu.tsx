import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { LogOutIcon, Menu, Moon, Sun } from "lucide-react";
import useTheme from "@/hooks/useTheme";

function ConfigMenu() {
  const { handleLogoff } = useAuth();
  const { enabled, handleThemeChange } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"aria-expanded:bg-muted aria-expanded:dark:bg-primary"}
        render={<Button variant="ghost" size={"icon"} />}
      >
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={handleThemeChange}
            className="flex w-full items-center justify-between"
          >
            <p>Tema</p>
            {enabled ? <Moon /> : <Sun />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogoff}
            className="flex w-full items-center justify-between"
          >
            <p>Sair</p> <LogOutIcon />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ConfigMenu;
