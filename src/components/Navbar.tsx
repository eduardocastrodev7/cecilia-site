"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Produtos", href: "/#produtos", dropdown: true },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Processo", href: "/#processo" },
  { label: "Parceiros", href: "/#parceiros" },
  { label: "Blog", href: "/blog" },
];

const productLinks = [
    {
    label: "Cecília Commerce",
    href: "/commerce",
    description: "Construção e migração Shopify",
  },
  {
    label: "Cecília Core",
    href: "/core",
    description: "Fluxo entre Shopify e ERP com regras",
  },
  {
    label: "Cecília Pay",
    href: "/pay",
    description: "Divisão automática de pagamento por CNPJ",
  },
  {
    label: "Cecília Vision",
    href: "/vision",
    description: "Relatórios e painéis da operação",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setIsOpen(false);

      // Only smooth-scroll when we are on the Home page.
      if (!isHome) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      e.preventDefault();
      setTimeout(() => {
        const id = href.slice(hashIndex + 1);
        const el = document.getElementById(id);
        if (!el) return;

        const offset = 90;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }, 350);
    },
    [isHome]
  );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/70 backdrop-blur-2xl border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            style={{ display: "inline-block" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link href="/" className="flex items-center">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-secondary/30 border border-border/70 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <Image
                  src="/logo-cecilia.svg"
                  alt="Cecília Digital"
                  width={176}
                  height={133}
                  className="h-3.5 w-auto"
                  priority
                />
              </span>
              <span className="font-display text-lg font-semibold text-foreground ml-2">Cecília Digital</span>
            </Link>
          </motion.div>

          {/* Desktop Nav - centered */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-full border border-border/40 bg-card/60 backdrop-blur-xl px-1.5 py-1.5">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  style={{ display: "inline-block" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.dropdown ? (
                    <div className="relative group">
                      <Link
                        href={link.href}
                        className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-primary/10 block inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </Link>

                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                        <div className="w-[360px] rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl p-2 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
                          <div className="px-3 py-2">
                            <div className="text-xs font-semibold tracking-wide text-muted-foreground">
                              Produtos
                            </div>
                          </div>
                          <div className="h-px bg-border/60 my-1" />
                          {productLinks.map((p) => (
                            <Link
                              key={p.href}
                              href={p.href}
                              className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-secondary/60 transition-colors"
                            >
                              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-foreground/50" />
                              <div>
                                <div className="text-sm font-semibold text-foreground leading-tight">
                                  {p.label}
                                </div>
                                <div className="text-sm text-muted-foreground leading-tight mt-0.5">
                                  {p.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-primary/10 block"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <motion.a
              href="https://wa.me/5516991054211"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_-8px_hsl(0,0%,100%,0.25)]"
            >
              Falar com a Cecília
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.dropdown ? (
                    <div className="pt-2">
                      <Link
                        href={link.href}
                        onClick={(e) => handleMobileNav(e, link.href)}
                        className="block py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>

                      <div className="ml-3 pl-3 border-l border-border/60 space-y-1 pb-2">
                        {productLinks.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {p.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => handleMobileNav(e, link.href)}
                      className="block py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="inline-block"
              >
                <Link
                  href="/#contato"
                  onClick={(e) => handleMobileNav(e, "/#contato")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground mt-4"
                >
                  Falar com a Cecília
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;