import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-secondary/30 border border-border/70 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <Image
                  src="/logo-cecilia.svg"
                  alt="Cecília Digital"
                  width={176}
                  height={133}
                  className="h-3.5 w-auto"
                />
              </span>
              <span className="font-display text-lg font-semibold">Cecília Digital</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Infraestrutura e operação para e-commerce escalar sem quebrar.
            </p>
          </div>

          {/* Produtos */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Produtos</h4>
            <ul className="space-y-3">
              {[
                { label: "Cecília Commerce", href: "/commerce" },
                { label: "Cecília Core", href: "/core" },
                { label: "Cecília Pay", href: "/pay" },
                { label: "Cecília Vision", href: "/vision" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-3">
              {[
                { label: "Sobre", href: "/#sobre" },
                { label: "Produtos", href: "/#produtos" },
                { label: "Diferenciais", href: "/#diferenciais" },
                { label: "Processo", href: "/#processo" },
                { label: "Parceiros", href: "/#parceiros" },
                { label: "Contato", href: "/#contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="mailto:mkt@cecilia.digital"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  mkt@cecilia.digital
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/5516991054211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  WhatsApp <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <Link
                href="https://www.linkedin.com/company/cecilia-digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.instagram.com/cecilia.digital_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cecília Digital. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Engenharia e Infraestrutura para E-commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;