import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid2X2, List } from "lucide-react";
import { BOOKS_DATA } from "../constants";
import BookCard from "../components/BookCard";
import { motion, AnimatePresence } from "motion/react";

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Title");

  const categories = ["All", "Fiction", "Sci-Fi", "Biography", "Self-Help", "History", "Science"];
  const priceRanges = ["All", "Under $20", "$20 - $30", "Over $30"];

  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter(book => {
      const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) || 
                           book.author.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || book.category === category;
      
      let matchesPrice = true;
      if (priceRange === "Under $20") matchesPrice = book.price < 20;
      else if (priceRange === "$20 - $30") matchesPrice = book.price >= 20 && book.price <= 30;
      else if (priceRange === "Over $30") matchesPrice = book.price > 30;

      return matchesQuery && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "Title") return a.title.localeCompare(b.title);
      if (sortBy === "Price (Low-High)") return a.price - b.price;
      if (sortBy === "Price (High-Low)") return b.price - a.price;
      if (sortBy === "Rating") return b.rating - a.rating;
      return 0;
    });
  }, [query, category, priceRange, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Exploration Gallery</h1>
        <p className="mt-2 text-zinc-500">Discover over {BOOKS_DATA.length} handpicked titles.</p>
        
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-stone-200 bg-brand-bg px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-stone-200 outline-none dark:border-zinc-800 dark:bg-zinc-900">
            <Search className="text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by title or author..."
              className="w-full bg-transparent text-sm focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              className="rounded-2xl border border-stone-200 bg-brand-bg px-4 py-3 text-sm focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Title</option>
              <option>Price (Low-High)</option>
              <option>Price (High-Low)</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-10">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                          category === cat 
                            ? "bg-indigo-600 text-white" 
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Price Range</label>
                  <select 
                    className="w-full rounded-xl border border-stone-200 bg-brand-bg px-3 py-2 text-sm focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    {priceRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-900/10">
              <h4 className="text-sm font-bold text-indigo-600">Newsletter Deal</h4>
              <p className="mt-2 text-xs text-indigo-700 dark:text-indigo-400">
                Sign up for our newsletter and get 15% off your first purchase!
              </p>
              <button className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors">
                Claim Now
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">
              Showing {filteredBooks.length} results
            </span>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Grid2X2 size={18} />
              </button>
              <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <List size={18} />
              </button>
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
                <Search size={48} className="text-zinc-300" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">No books found</h3>
              <p className="mt-2 text-zinc-500">We couldn't find any books matching your criteria.</p>
              <button 
                onClick={() => { setQuery(""); setCategory("All"); setPriceRange("All"); }}
                className="mt-6 font-semibold text-indigo-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
