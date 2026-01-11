import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Rss, Mail, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-auto">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6 transition-[max-width] duration-300 ease-in-out">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/dp.jpeg"
            alt="Elhaam Basheer Chaudhry"
            width={80}
            height={80}
            loading="lazy"
            className="rounded-full border-2 border-border"
          />
          <h3 className="font-bold text-lg">Hi, I'm Elhaam Basheer Chaudhry</h3>
        </div>

        <div className="space-y-3 max-w-2xl">
          <p className="text-muted-foreground leading-relaxed">
            I make fast and SEO-friendly websites for a living. I run{" "}
            <a
              href="https://truedevs.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all font-medium"
            >
              TrueDevs
            </a>
            , where we craft thoughtfully engineered websites. In my free time,
            I code low-level software, read and write about things I find
            interesting.
          </p>
        </div>

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
            href="https://www.upwork.com/freelancers/elhaam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
            </svg>
            <span className="sr-only">Upwork</span>
          </Link>
          <Link
            href="https://x.com/standoutcoder"
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
