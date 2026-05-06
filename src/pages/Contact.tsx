export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">Get in Touch.</h1>
        <p className="mt-4 text-zinc-500">Need help with an order or looking for a specific title? We're here to help.</p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
           <h2 className="text-xl font-bold mb-6">Send us a message</h2>
           <form className="space-y-6">
              <div>
                 <label className="block text-sm font-semibold mb-2">Name</label>
                 <input type="text" className="w-full rounded-xl border border-zinc-200 py-3 px-4 focus:ring-2 focus:ring-indigo-600 focus:outline-none dark:bg-zinc-950 dark:border-zinc-800" />
              </div>
              <div>
                 <label className="block text-sm font-semibold mb-2">Email</label>
                 <input type="email" className="w-full rounded-xl border border-zinc-200 py-3 px-4 focus:ring-2 focus:ring-indigo-600 focus:outline-none dark:bg-zinc-950 dark:border-zinc-800" />
              </div>
              <div>
                 <label className="block text-sm font-semibold mb-2">Message</label>
                 <textarea rows={4} className="w-full rounded-xl border border-zinc-200 py-3 px-4 focus:ring-2 focus:ring-indigo-600 focus:outline-none dark:bg-zinc-950 dark:border-zinc-800" />
              </div>
              <button className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors">
                 Send Message
              </button>
           </form>
        </div>
        
        <div className="flex flex-col justify-center space-y-12">
           <div>
              <h3 className="text-lg font-bold">HQ Office</h3>
              <p className="mt-2 text-zinc-500">123 Storyteller Lane<br />Lexis City, BK 54321</p>
           </div>
           <div>
              <h3 className="text-lg font-bold">General Inquiries</h3>
              <p className="mt-2 text-zinc-500">hello@remontada.com<br />+1 (555) 000-0000</p>
           </div>
           <div>
              <h3 className="text-lg font-bold">Social</h3>
              <p className="mt-2 text-zinc-500">@remontadabooks on Twitter, Instagram, and TikTok.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
