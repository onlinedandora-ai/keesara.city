import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-5 border-t border-line px-6 py-10 pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 text-sm text-ink-mute">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-teal-900">{SITE.name}</p>
            <span className="text-xs font-semibold text-amber-600 bg-amber-100/60 dark:bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-500/20">
              by {SITE.author}
            </span>
          </div>
          <p className="mt-1">{SITE.description}</p>
          <p className="mt-3 max-w-md text-xs">
            Powered by{" "}
            <a
              href={SITE.github}
              className="font-medium text-teal-700 underline hover:text-teal-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.brand}
            </a>
            . Highlight images from{" "}
            <a
              href="https://commons.wikimedia.org"
              className="underline hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Link href="/directory" className="hover:text-teal-700">
            Directory
          </Link>
          <Link href="/journal" className="hover:text-teal-700">
            Journal
          </Link>
          <Link href="/#highlights" className="hover:text-teal-700">
            Highlights
          </Link>
          <Link href="/news" className="hover:text-teal-700">
            News
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-700 font-medium text-teal-700"
          >
            GitHub (@onlinedandora-ai)
          </a>
          <span>About</span>
          <span>Advertise</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}
