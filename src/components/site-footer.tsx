import Link from "next/link";
import { Github, Twitter, Rss, Mail, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-auto">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6 transition-[max-width] duration-300 ease-in-out">
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          I code and research for a living. I run{" "}
          <a
            href="https://truedevs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all font-medium"
          >
            TrueDevs
          </a>
          , where we craft thoughtfully engineered websites.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/itse4elhaam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/elhaam-ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://x.com/elhaamthinks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">X (Twitter)</span>
          </Link>
          <Link
            href="/rss.xml"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <Rss className="h-5 w-5" />
            <span className="sr-only">RSS</span>
          </Link>
          <Link
            href="mailto:e4elhaam@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground/60 pt-4">
          © {new Date().getFullYear()} Elhaam Basheer Chaudhry
        </p>
      </div>
    </footer>
  );
}
