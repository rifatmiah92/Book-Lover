import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Star, ArrowRight, Mail, Menu } from "lucide-react";
import { BOOKS_DATA } from "../constants";
import BookCard from "../components/BookCard";
import { motion } from "motion/react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const trendingBooks = BOOKS_DATA.slice(0, 6); // Exactly 6 items as requested

  const authors = [
    { name: "Eddie Lobanovskiy", books: "64 Books", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=clamp&w=150" },
    { name: "Uran Khan", books: "54 Books", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=clamp&w=150" },
    { name: "CRI$$ Johns", books: "21 Books", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=clamp&w=150" },
    { name: "Muhammed Sajid", books: "45 Books", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=clamp&w=150" },
    { name: "George Bokhua", books: "37 Books", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=clamp&w=150" },
    { name: "Nata Schepy", books: "21 Books", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=clamp&w=150" },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Background Blobs for Hero */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 overflow-hidden pointer-events-none">
           <div className="h-[600px] w-[600px] rounded-full bg-[#D2B48C]/20 blur-3xl absolute right-[-20%] top-[-10%]" />
           <div className="h-[400px] w-[400px] rounded-full bg-[#002147]/10 blur-3xl absolute right-[10%] bottom-0" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D2B48C]">The Business Of</span>
              <h1 className="text-7xl font-serif leading-[0.9] text-[#002147] md:text-9xl">
                Design
              </h1>
            </div>
            
            <div className="flex gap-12 border-t border-stone-200 pt-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Author</p>
                  <p className="font-serif text-lg text-[#002147]">Keith Granet</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Type</p>
                  <p className="font-serif text-lg text-[#002147]">Design thinking</p>
               </div>
            </div>

            <div className="flex items-center gap-4 py-4">
               <div className="flex text-[#D2B48C]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
               </div>
               <span className="text-xs font-bold text-stone-400">4.1 / 687 Reviews</span>
            </div>

            <div className="flex items-center gap-8">
               <span className="text-4xl font-serif font-bold text-[#002147] leading-none">$32.78</span>
               <button className="flex items-center gap-3 rounded-full bg-[#002147] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 hover:shadow-xl hover:shadow-[#002147]/20">
                  <ShoppingBag size={16} />
                  Add to Cart
               </button>
            </div>
          </div>

          <div className="relative flex justify-center">
             <div className="relative z-10 w-full max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                  alt="Featured Design Book" 
                  className="rounded-sm shadow-[30px_30px_100px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.02]"
                />
             </div>
             {/* Abstract Shapes behind book */}
             <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full bg-emerald-400/20 blur-2xl absolute -left-10" />
                <div className="h-48 w-48 rounded-full bg-orange-400/20 blur-2xl absolute -bottom-10" />
             </div>
          </div>
        </div>
      </section>

      {/* Highlight Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           {/* Card 1 */}
           <div className="group flex items-center gap-8 rounded-none bg-white p-8 shadow-sm transition-all hover:shadow-xl border border-stone-100">
              <div className="relative h-48 w-32 flex-shrink-0">
                 <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover shadow-lg" />
                 {/* Blob behind book */}
                 <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-full bg-red-400/10 blur-2xl" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-serif text-[#002147]">Don't Make me Think</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">By Steve Krug</p>
                 <div className="flex items-center gap-4">
                    <span className="font-serif text-xl font-bold text-[#002147]">$32.75</span>
                    <span className="text-xs text-stone-300 line-through font-bold">$37.90</span>
                 </div>
                 <button className="rounded-full bg-[#D2B48C] px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#002147]">
                   Add to Cart
                 </button>
              </div>
           </div>
           {/* Card 2 */}
           <div className="group flex items-center gap-8 rounded-none bg-white p-8 shadow-sm transition-all hover:shadow-xl border border-stone-100">
              <div className="relative h-48 w-32 flex-shrink-0">
                 <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" className="h-full w-full object-cover shadow-lg" />
                 {/* Blob behind book */}
                 <div className="absolute -right-4 -bottom-4 -z-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-serif text-[#002147]">The joy of UX</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">By David Platt</p>
                 <div className="flex items-center gap-4">
                    <span className="font-serif text-xl font-bold text-[#002147]">$29.75</span>
                    <span className="text-xs text-stone-300 line-through font-bold">$32.90</span>
                 </div>
                 <button className="rounded-full bg-[#D2B48C] px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#002147]">
                   Add to Cart
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-5xl font-serif text-[#002147]">Top selling book</h2>
          <Link to="/items" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-[#002147] transition-colors">
            View all
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 lg:grid-cols-6">
          {trendingBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Top Authors Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-5xl font-serif text-[#002147]">Top Authors</h2>
          <Link to="/about" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-[#002147] transition-colors">
            View all
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {authors.map((author, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
               <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-110">
                  <img src={author.image} alt={author.name} className="h-full w-full object-cover" />
               </div>
               <h4 className="text-xs font-bold text-[#002147] mb-1">{author.name}</h4>
               <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">{author.books}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-none bg-[#D2B48C]/5 p-16 text-center border-t border-b border-stone-100">
          <h2 className="text-4xl font-serif text-[#002147] mb-8">Subscribe to newsletter</h2>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-stone-200 bg-white p-2 focus-within:border-[#002147] transition-colors">
            <input 
              type="email" 
              placeholder="You@example.com" 
              className="flex-1 bg-transparent px-6 text-sm outline-none placeholder:text-stone-300"
            />
            <button className="rounded-full bg-[#002147] px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-stone-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
