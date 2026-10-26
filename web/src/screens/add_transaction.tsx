import AddTransactionForm from "@/components/forms/add";
import ScreenLoading from "@/components/screen_loading";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import { cn } from "cn";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function AddTransaction() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  return (
    <div className="relative flex w-full flex-1 flex-col items-start justify-start px-4 pt-4">
      {loading && <ScreenLoading />}
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col",
          loading && "blur-xs",
        )}
      >
        <section className="mb-4 flex w-full items-center justify-start">
          <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
        </section>
        <AddTransactionForm />
      </div>
    </div>
  );
}

export default AddTransaction;
