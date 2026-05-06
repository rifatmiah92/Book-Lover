export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
        Curating Knowledge since 2024.
      </h1>
      <p className="mt-8 text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Remontada Bookstore was born out of a desire to create a sanctuary for readers in the digital age. 
        We specialize in finding the unfindable—rare editions, limited prints, and masterpieces that 
        deserve a place on your physical or digital shelf.
      </p>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
           <div className="text-4xl font-extrabold text-indigo-600">50k+</div>
           <p className="mt-2 text-sm font-bold text-zinc-400 uppercase tracking-widest text-zinc-900 dark:text-white">Titles Curated</p>
        </div>
        <div>
           <div className="text-4xl font-extrabold text-indigo-600">120k+</div>
           <p className="mt-2 text-sm font-bold text-zinc-400 uppercase tracking-widest text-zinc-900 dark:text-white">Active Readers</p>
        </div>
        <div>
           <div className="text-4xl font-extrabold text-indigo-600">Global</div>
           <p className="mt-2 text-sm font-bold text-zinc-400 uppercase tracking-widest text-zinc-900 dark:text-white">Delivery Network</p>
        </div>
      </div>
    </div>
  );
}
