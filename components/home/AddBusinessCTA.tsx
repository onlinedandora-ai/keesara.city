import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AddBusinessCTA() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-teal-700 px-6 py-11 text-center text-white">
        <h2 className="text-2xl font-bold">Own a business in Keesara?</h2>
        <p className="mx-auto mt-2.5 max-w-lg text-sm text-[#cfe3de]">
          List it free, and get discovered by residents searching right here on keesara.city.
        </p>
        <Link href="/directory" className="mt-5 inline-block">
          <Button variant="amber">Add your business →</Button>
        </Link>
      </div>
    </section>
  );
}
