import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "../lib/CartContext";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentStep(2);
    setTimeout(() => {
      setPaymentStep(3);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <div className="rounded-full bg-stone-100 p-8 dark:bg-stone-900">
          <Trash2 size={48} className="text-stone-300" />
        </div>
        <h2 className="mt-8 font-serif text-3xl text-stone-900 dark:text-white">Your bag is empty</h2>
        <p className="mt-4 max-w-sm text-stone-500">
          It looks like you haven't added anything to your curation yet.
        </p>
        <Link
          to="/items"
          className="mt-8 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-stone-800 dark:bg-white dark:text-stone-900"
        >
          Browse Our Collection
        </Link>
      </div>
    );
  }

  if (isCheckingOut && paymentStep === 3) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full bg-emerald-100 p-8 text-emerald-600 dark:bg-emerald-900/20"
        >
          <ShieldCheck size={64} />
        </motion.div>
        <h2 className="mt-8 font-serif text-4xl text-stone-900 dark:text-white">Thank you for your order.</h2>
        <p className="mt-4 max-w-sm text-stone-500">
          Your curation is being prepared for delivery. You'll receive an email confirmation shortly.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-stone-800 dark:bg-white dark:text-stone-900"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-12 font-serif text-4xl tracking-tight text-stone-900 dark:text-white">
        {isCheckingOut ? "Checkout" : "Your Curation"}
      </h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left Column: Cart Items or Checkout Form */}
        <div className="lg:col-span-8">
          {!isCheckingOut ? (
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6 border-b border-stone-100 pb-8 sm:flex-row dark:border-stone-800"
                  >
                    <div className="h-40 w-32 shrink-0 overflow-hidden rounded-sm bg-stone-100 dark:bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-serif text-xl text-stone-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mt-1">
                            {item.author}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-4 rounded-full border border-stone-200 p-1 dark:border-stone-800">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-full p-2 hover:bg-stone-100 dark:hover:bg-stone-900"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-8 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-full p-2 hover:bg-stone-100 dark:hover:bg-stone-900"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-serif text-lg font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-12">
              <section>
                <h3 className="mb-6 font-serif text-2xl font-bold">Shipping Details</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full border-b border-stone-200 bg-transparent py-2 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full border-b border-stone-200 bg-transparent py-2 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Shipping Address</label>
                    <input type="text" placeholder="123 Editorial Way" className="w-full border-b border-stone-200 bg-transparent py-2 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" required />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-serif text-2xl font-bold">Payment Method</h3>
                   <div className="flex gap-2 text-stone-300">
                      <CreditCard size={24} />
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-stone-200 bg-transparent py-2 tracking-[0.2em] focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" maxLength={19}/>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Expiry Date</label>
                         <input type="text" placeholder="MM/YY" className="w-full border-b border-stone-200 bg-transparent py-2 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-stone-400">CVC</label>
                         <input type="text" placeholder="123" className="w-full border-b border-stone-200 bg-transparent py-2 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:focus:border-white" maxLength={3} />
                      </div>
                   </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-none border border-stone-200 bg-brand-bg p-8 dark:border-stone-800 dark:bg-stone-900">
            <h3 className="mb-8 font-serif text-2xl font-bold">Summary</h3>
            <div className="space-y-4 border-b border-stone-100 pb-8 dark:border-stone-800">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="font-bold italic">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Taxes</span>
                <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <span className="font-serif text-xl font-bold">Total</span>
              <span className="font-serif text-xl font-bold">
                ${(cartTotal * 1.08).toFixed(2)}
              </span>
            </div>

            {paymentStep === 1 ? (
              <button
                onClick={isCheckingOut ? handlePayment : handleCheckout}
                className="mt-12 flex w-full items-center justify-center gap-3 rounded-full bg-stone-900 py-5 text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-stone-800 dark:bg-white dark:text-stone-900"
              >
                {isCheckingOut ? "Confirm Payment" : "Finalize Order"}
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="mt-12 flex w-full items-center justify-center gap-3 py-5 text-stone-500">
                 <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
                 <span className="text-xs font-bold uppercase tracking-widest">Processing Transaction</span>
              </div>
            )}
            
            <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Secure Checkout & Free Global Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
