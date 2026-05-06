import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Share2, Heart } from "lucide-react";
import { BOOKS_DATA } from "../constants";
import BookCard from "../components/BookCard";
import { motion } from "motion/react";
import { useCart } from "../lib/CartContext";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = BOOKS_DATA.find((b) => b.id === id);
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (!book) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold">Book Not Found</h2>
        <Link to="/items" className="mt-4 text-indigo-600 hover:underline">Return to Gallery</Link>
      </div>
    );
  }

  const relatedBooks = BOOKS_DATA
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
      >
        <ArrowLeft size={20} /> Back to Gallery
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 shadow-2xl dark:bg-zinc-900"
        >
          <img 
            src={book.image} 
            alt={book.title}
            className="h-full w-full object-cover p-12 lg:p-24 shadow-inner"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-3">
             <button className="rounded-full bg-white/80 p-3 text-zinc-900 backdrop-blur-md transition-all hover:bg-white dark:bg-zinc-950/80 dark:text-white">
                <Heart size={20} />
             </button>
             <button className="rounded-full bg-white/80 p-3 text-zinc-900 backdrop-blur-md transition-all hover:bg-white dark:bg-zinc-950/80 dark:text-white">
                <Share2 size={20} />
             </button>
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col py-6"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            {book.category}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            {book.title}
          </h1>
          <p className="mt-2 text-xl font-medium text-zinc-500">by {book.author}</p>

          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={20} fill="currentColor" />
              <span className="text-lg font-bold">{book.rating}</span>
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-sm font-medium text-zinc-500">2.5k Reviews</span>
          </div>

          <div className="mt-10 mb-8 h-px bg-zinc-100 dark:bg-zinc-800" />

          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {book.description}
          </p>

          <div className="mt-auto pt-12">
            <div className="mb-6 flex items-end gap-3 font-bold">
              <span className="text-4xl text-zinc-900 dark:text-white">${book.price}</span>
              <span className="mb-1 text-zinc-400 line-through text-xl">$34.99</span>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button 
                onClick={() => addToCart(book)}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-stone-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-200/50"
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>
              <button className="flex items-center justify-center gap-3 rounded-2xl border-2 border-zinc-200 px-8 py-4 text-lg font-bold transition-all hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-white">
                Wishlist
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="mt-24">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Related Reads</h2>
            <Link to="/items" className="font-semibold text-indigo-600 hover:underline">Browse Category</Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
