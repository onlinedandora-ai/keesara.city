"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function AddBusinessCTA() {
  const { user, openAuth } = useApp();

  const startAdd = () => {
    if (user) return;
    sessionStorage.setItem("postAuthRedirect", "/directory/add");
    openAuth();
  };

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-teal-700 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border dark:border-slate-700 px-6 py-11 text-center text-white shadow-xl">
        <h2 className="text-2xl font-bold">Own a business in Keesara?</h2>
        <p className="mx-auto mt-2.5 max-w-lg text-sm text-[#cfe3de] dark:text-slate-300">
          List it free with your address, phone, and Google Maps location — get discovered by
          residents searching on {SITE.name}.
        </p>
        <div className="mt-5 inline-block">
          {user ? (
            <Link href="/directory/add">
              <Button variant="amber">Add your business →</Button>
            </Link>
          ) : (
            <Button variant="amber" onClick={startAdd}>
              Login to add your business →
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
