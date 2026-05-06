"use client";
import { ReactNode } from "react";

export function Button ({ children }: { children: ReactNode }) {
  return (
    <button className="bg-blue-200 h-40 w-40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
};
