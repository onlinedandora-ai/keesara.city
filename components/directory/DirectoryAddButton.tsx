"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

export function DirectoryAddButton() {
  const { user, openAuth } = useApp();

  if (user) {
    return (
      <Link href="/directory/add">
        <Button variant="amber">Add your business</Button>
      </Link>
    );
  }

  return (
    <Button
      variant="amber"
      onClick={() => {
        sessionStorage.setItem("postAuthRedirect", "/directory/add");
        openAuth();
      }}
    >
      Add your business
    </Button>
  );
}
