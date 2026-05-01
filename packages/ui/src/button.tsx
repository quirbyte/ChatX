"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: ()=>void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding:10,
        margin: 10,
        background: "#362626",
        color: "white"
      }}
    >
      {children}
    </button>
  );
};
