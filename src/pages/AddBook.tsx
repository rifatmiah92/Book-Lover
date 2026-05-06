import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Plus, Image as ImageIcon, Tag, DollarSign, FileText, Loader2, Book } from "lucide-react";
import toast from "react-hot-toast";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Fiction",
    image: "",
    author: ""
  });

  const categories = ["Fiction", "Sci-Fi", "Biography", "Self-Help", "History", "Science"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return toast.error("Please login first");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "books"), {
        ...formData,
        price: parseFloat(formData.price),
        rating: 5.0, // Default rating for new books
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: serverTimestamp()
      });
      
      toast.success("Book added successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Fiction",
        image: "",
        author: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Expand the Collection</h1>
        <p className="mt-2 text-zinc-500">Share your favorite reads with the Remontada community.</p>
      </div>

      <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-xl md:p-12 dark:border-zinc-800 dark:bg-zinc-900">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Title */}
          <div className="col-span-2 md:col-span-1">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Book Title</label>
            <div className="relative">
              <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                required
                placeholder="e.g. The Great Adventure"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>

          {/* Author */}
          <div className="col-span-2 md:col-span-1">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Author Name</label>
            <div className="relative">
              <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                required
                placeholder="e.g. Jane Smith"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
            </div>
          </div>

          {/* Price */}
          <div className="col-span-2 md:col-span-1">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Price ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="number" 
                step="0.01"
                required
                placeholder="29.99"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          {/* Category */}
          <div className="col-span-2 md:col-span-1">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Category</label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <select 
                required
                className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="url" 
                required
                placeholder="https://images.unsplash.com/your-image-url"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Description</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-zinc-400" size={18} />
              <textarea 
                required
                rows={4}
                placeholder="Tell us a bit about this book..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="col-span-2 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "Publish Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
