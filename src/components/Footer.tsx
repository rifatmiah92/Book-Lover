import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Linkedin, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] px-4 py-24 sm:px-6 lg:px-8 border-t border-stone-200">
      <div className="mx-auto max-w-7xl text-[#002147]">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-bold font-serif text-[#002147]">BookLover</Link>
            <div className="mt-8 flex flex-col gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#002147]/60">
                  <span className="h-0.5 w-4 bg-[#D2B48C]"></span>
                  English
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#002147]/60">
                  <span className="h-0.5 w-4 bg-[#D2B48C]"></span>
                  $ USD - US Dollar
               </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#002147]">Home</h4>
            <ul className="space-y-4 text-xs font-medium text-stone-500">
               <li><Link to="/items" className="hover:text-[#002147]">Books</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Electronics</Link></li>
               <li><Link to="/about" className="hover:text-[#002147]">Accessories</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Gift Card</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Stationery</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#002147]">Shop by</h4>
            <ul className="space-y-4 text-xs font-medium text-stone-500">
               <li><Link to="/items" className="hover:text-[#002147]">Book Category</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Electronics Category</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Boi Mela 2019</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Pre Order</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Foreign Books</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#002147]">Products</h4>
            <ul className="space-y-4 text-xs font-medium text-stone-500">
               <li><Link to="/items" className="hover:text-[#002147]">Brands</Link></li>
               <li><Link to="/about" className="hover:text-[#002147]">Authors</Link></li>
               <li><Link to="/items" className="hover:text-[#002147]">Publishers</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Reviews</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Q&A</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#002147]">Support</h4>
            <ul className="space-y-4 text-xs font-medium text-stone-500">
               <li><Link to="/contact" className="hover:text-[#002147]">Order Track</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Contact Us</Link></li>
               <li><Link to="/about" className="hover:text-[#002147]">Find My Product</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">Guide</Link></li>
               <li><Link to="/contact" className="hover:text-[#002147]">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-bold uppercase tracking-widest text-[#002147]/40 leading-loose">
             &copy; {new Date().getFullYear()} BookLover. Designed for curation.
           </p>
           <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#002147]/40">
              <Link to="/contact" className="hover:text-[#002147]">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-[#002147]">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
