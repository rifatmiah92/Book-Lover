import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { Mail, Lock, Chrome, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-zinc-500">Sign in to manage your collection.</p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-950/20 dark:text-red-400">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">Email Address</label>
              <div className="mt-2 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm ring-indigo-600 transition-all focus:border-indigo-600 focus:outline-none focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
              </div>
              <div className="mt-2 relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm ring-indigo-600 transition-all focus:border-indigo-600 focus:outline-none focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Or continue with</span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-zinc-200 py-3 text-sm font-bold transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
          >
            <Chrome size={18} />
            Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-indigo-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
