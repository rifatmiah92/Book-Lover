import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import ManageBooks from "./pages/ManageBooks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./lib/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-brand-bg text-zinc-900 transition-colors selection:bg-indigo-100 dark:bg-zinc-950 dark:text-zinc-100">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Books />} />
              <Route path="/items/:id" element={<BookDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Protected Routes */}
              <Route 
                path="/items/add" 
                element={
                  <ProtectedRoute>
                    <AddBook />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/items/manage" 
                element={
                  <ProtectedRoute>
                    <ManageBooks />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
