import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut, User, Plus, LayoutDashboard, Menu, X, BookOpen, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/items" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-100 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-8">
           <button className="text-stone-400 hover:text-[#002147] md:hidden">
              <Menu size={20} />
           </button>
           <div className="hidden items-center gap-8 md:flex">
             {navLinks.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-[#002147]"
               >
                 {link.name}
               </Link>
             ))}
           </div>
        </div>

        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter font-serif text-[#002147]">
          <span>BookLover</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-stone-600 hover:text-[#002147] pt-2.5 transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#002147] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 bg-white text-stone-700 transition-all hover:border-[#002147]"
              >
                <User size={20} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl border border-stone-200 bg-white p-2 shadow-xl dark:border-stone-800 dark:bg-stone-950"
                    >
                      <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Account</p>
                        <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/items/add"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Plus size={16} />
                          Add Book
                        </Link>
                        <Link
                          to="/items/manage"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Manage Books
                        </Link>
                      </div>
                      <div className="border-t border-stone-100 p-1 dark:border-stone-800">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/login"
                className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-[#002147] px-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-[10px] font-bold uppercase tracking-widest bg-[#002147] text-white px-6 py-3 rounded-full hover:bg-stone-800 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-stone-100 bg-[#FAF9F6] md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <div className="mt-4 flex flex-col gap-2 border-t border-stone-100 pt-4">
                  <Link
                    to="/login"
                    className="rounded-lg border border-stone-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-stone-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg bg-[#002147] px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
