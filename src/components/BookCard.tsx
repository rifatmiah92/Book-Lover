import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function BookCard({ book }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer text-center"
    >
      <Link to={`/items/${book.id}`} className="block">
        <div className="relative aspect-[3/4] mb-4 flex items-center justify-center">
          {/* Decorative Blobs */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 transition-transform duration-500 group-hover:scale-110">
             <div className="h-4/5 w-4/5 rounded-full bg-[#D2B48C] blur-3xl absolute -left-4 -top-4 opacity-30" />
             <div className="h-4/5 w-4/5 rounded-full bg-[#002147] blur-3xl absolute -right-4 -bottom-4 opacity-20" />
          </div>

          <img
            src={book.image}
            alt={book.title}
            className="relative h-full w-[85%] object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-2xl"
          />
        </div>
        
        <div className="space-y-1">
          <h4 className="text-base font-serif text-[#002147] dark:text-white transition-colors group-hover:text-stone-500">
            {book.title}
          </h4>
          <p className="text-[10px] uppercase tracking-widest text-[#D2B48C] font-black">
            {book.author}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-serif text-lg font-bold text-[#002147] dark:text-stone-300">
              ${book.price}
            </span>
            <span className="text-xs text-stone-300 line-through font-bold">
              ${(book.price * 1.25).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
