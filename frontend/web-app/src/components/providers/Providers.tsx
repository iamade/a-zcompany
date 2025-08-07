"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/stores/useAuthStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const checkAuthState = useAuthStore((state) => state.checkAuthState);

  useEffect(() => {
    setMounted(true);
    checkAuthState();
  }, [checkAuthState]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
