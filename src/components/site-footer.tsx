import Link from "next/link";
import { Github, Twitter, Rss, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold">Elhaam Basheer Chaudhry</h3>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Building thoughtful software. Currently focusing on high-performance web architecture and developer tools.
          </p>
          <div className="flex gap-4">
            <Link 
              href="https://github.com/code-yeongyu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://twitter.com/elhaam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link 
              href="/rss.xml" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Rss className="h-5 w-5" />
              <span className="sr-only">RSS</span>
            </Link>
             <Link 
              href="mailto:elhaam@truedevs.tech" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="md:text-right space-y-4">
          <p className="text-sm font-medium text-foreground">
             I do thoughtful engineering at{" "}
            <a 
              href="https://truedevs.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 decoration-primary/30"
            >
              truedevs.tech
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elhaam Basheer Chaudhry.
          </p>
        </div>
      </div>
    </footer>
  );
}
