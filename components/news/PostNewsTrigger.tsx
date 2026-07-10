"use client";

import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

export function PostNewsTrigger() {
  const { openPostNews } = useApp();
  return (
    <Button variant="ghost" onClick={openPostNews} className="shrink-0">
      Post update
    </Button>
  );
}
