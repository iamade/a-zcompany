"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/stores/useAuthStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { checkAuthState, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    
    if (!isAuthenticated) {
      checkAuthState();
    }
  }, [checkAuthState, isAuthenticated]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;

}
