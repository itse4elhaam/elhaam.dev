import Link from "next/link";
import { Github, Twitter, Rss, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-auto">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6 transition-[max-width] duration-300 ease-in-out">
        
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Elhaam Basheer Chaudhry</h3>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            I practice thoughtful engineering — crafting software that's built to last.
            <br />
            Working with an exceptional team at{" "}
            <a 
              href="https://truedevs.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all"
            >
              truedevs.tech
            </a>
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
