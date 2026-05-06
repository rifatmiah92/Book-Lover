import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Join the Adventure</h1>
          <p className="mt-2 text-zinc-500">Create an account to start your journey.</p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-950/20 dark:text-red-400">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">Full Name</label>
              <div className="mt-2 relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm ring-indigo-600 transition-all focus:border-indigo-600 focus:outline-none focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
            </div>

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
              <label className="block text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">Password</label>
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
