import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProductDetail {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  longDescription: string;
  highlights: string[];
}

interface ProductDetailModalProps {
  product: ProductDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <product.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="font-display text-xl font-bold">{product.name}</DialogTitle>
              <p className="text-primary text-sm font-medium">{product.tagline}</p>
            </div>
          </div>
          <DialogDescription className="text-muted-foreground leading-relaxed pt-2">
            {product.longDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            O que inclui
          </h4>
          <ul className="space-y-3">
            {product.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Link
            href="https://wa.me/5516991054211"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all w-full justify-center"
          >
            Quero saber mais
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
