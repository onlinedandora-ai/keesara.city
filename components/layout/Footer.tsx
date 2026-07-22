import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-5 border-t border-line px-6 py-10 pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 text-sm text-ink-mute">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-teal-900">{SITE.name}</p>
          </div>
          <p className="mt-1">{SITE.description}</p>
          <p className="mt-3 max-w-md text-xs">
            Highlight images from{" "}
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
          <p className="mt-2 text-xs text-ink-mute">
            Developed by{" "}
            <a
              href="https://dandora.online"
              className="font-medium underline hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dandora Online
            </a>
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
          <span>About</span>
          <span>Advertise</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}


