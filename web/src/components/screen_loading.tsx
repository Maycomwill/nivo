import { Loader2 } from "lucide-react";

function ScreenLoading() {
  return (
    <div className="absolute z-10 flex h-screen w-full items-center justify-center">
      <div className="animate-spin">
        <Loader2 size={80} />
      </div>
    </div>
  );
}

export default ScreenLoading;
