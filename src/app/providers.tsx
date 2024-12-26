"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      {children}
      <Toaster />
    </ReduxProvider>
  );
}
