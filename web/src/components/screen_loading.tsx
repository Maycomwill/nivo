import { Loader2 } from 'lucide-react';
import React from 'react'

function ScreenLoading() {
  return (
    <div className="w-full min-h-screen z-10 absolute flex items-center justify-center">
        <div className="animate-spin">
            <Loader2 size={80} />
        </div>
    </div>
  )
}

export default ScreenLoading