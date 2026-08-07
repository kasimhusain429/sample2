import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-heading text-3xl font-bold text-foreground mb-4">Priva Int.</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Providing an exclusive collection of Vintage Kantha, Bed Throws, Designer Bedspreads, and Floor Stools since 2002.
          </p>
          <div className="flex gap-4 text-foreground/70 text-sm font-medium">
            <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-primary transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
          </div>
        </div>

        {/* Links */}
        <div className="col-span-1">
          <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Our Collection</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className="col-span-1">
          <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Our Products</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Block Printed Bed Covers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cushion Covers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Floor Stools</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Vintage Kantha</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-4 text-muted-foreground text-sm">
            <li className="flex gap-3 items-start">
              <MapPin size={18} className="shrink-0 text-primary" />
              <span>G-88, EPIP, Ricco Industrial, Near Indian Overseas Bank, Sitapura, Tonk Road, Jaipur, Rajasthan</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={18} className="text-primary" />
              <span>+91 9414014394</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={18} className="text-primary" />
              <span>privainternational@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Priva International. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
