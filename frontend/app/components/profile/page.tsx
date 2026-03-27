export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:px-8">
      <section className="rounded-2xl border border-brand-border bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Profile
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Shihab
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
          Programmer, learner, and educator focused on building clear and
          practical learning experiences.
        </p>
      </section>
    </div>
  );
}