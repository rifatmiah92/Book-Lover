import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Eye, Trash2, Edit3, ArrowUpRight, Search, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "books"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
      setLoading(false);
    }, (error) => {
      console.error(error);
      toast.error("Failed to load your books");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteDoc(doc(db, "books", id));
        toast.success("Book deleted");
      } catch (err) {
        toast.error("Failed to delete book");
      }
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Author Dashboard</h1>
          <p className="mt-2 text-zinc-500">Manage your published titles and track their performance.</p>
        </div>
        <Link 
          to="/items/add" 
          className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={18} /> Add New Title
        </Link>
      </div>

      {/* Stats Preview */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
         <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total Books</span>
            <div className="mt-2 flex items-end gap-2">
               <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">{books.length}</span>
               <span className="mb-1 text-sm font-bold text-emerald-500">+2 this month</span>
            </div>
         </div>
         <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total Sales</span>
            <div className="mt-2 flex items-end gap-2">
               <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">124</span>
               <span className="mb-1 text-sm font-bold text-emerald-500">+12% vs LY</span>
            </div>
         </div>
         <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Avg. Rating</span>
            <div className="mt-2 flex items-end gap-2">
               <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">4.9</span>
               <div className="mb-1.5 flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-current" />)}
               </div>
            </div>
         </div>
      </div>

      <div className="rounded-[2.5rem] border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-8 py-6 dark:border-zinc-800">
           <div className="relative max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search your titles..."
                 className="w-full rounded-2xl border border-zinc-100 bg-zinc-50 py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/50">
                <th className="px-8 py-4">Book Title</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-950/50">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-9 shrink-0 overflow-hidden rounded-lg shadow-md">
                        <img src={book.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">{book.title}</p>
                        <p className="text-sm text-zinc-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-zinc-900 dark:text-white">
                    ${parseFloat(book.price).toFixed(2)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        to={`/items/${book.id}`}
                        className="rounded-xl p-2 text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950"
                      >
                        <Eye size={18} />
                      </Link>
                      <button className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="rounded-xl p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="flex items-center justify-center py-12">
               <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          )}

          {!loading && filteredBooks.length === 0 && (
             <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-zinc-500">No books found matching your search.</p>
                <Link to="/items/add" className="mt-4 font-bold text-indigo-600 hover:underline">Add your first book</Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
