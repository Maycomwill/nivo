import { Loader2 } from "lucide-react";
import React from "react";

function ComponentLoading() {
  return (
    <div className="absolute z-10 flex w-full items-center justify-center">
      <div className="animate-spin">
        <Loader2 color="#60f3af" size={56} />
      </div>
    </div>
  );
}

export default ComponentLoading;
