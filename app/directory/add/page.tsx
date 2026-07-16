import Link from "next/link";
import { getCategories } from "@/lib/data";
import { AddBusinessForm } from "@/components/directory/AddBusinessForm";

export const metadata = {
  title: "Add your business",
  description: "List your Keesara business free on the local directory",
};

export default async function AddBusinessPage() {
  const categories = await getCategories();

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/directory" className="text-sm font-semibold text-teal-700">
          ← Back to directory
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-teal-900">Add your business</h1>
        <p className="mt-2 text-ink-soft">
          Free basic listing for shops, clinics, schools, services and more around ORR Exit 8 /
          Keesara.
        </p>
        <div className="mt-8">
          <AddBusinessForm categories={categories} />
        </div>
      </div>
    </div>
  );
}
