export default function loading() {
  return (
    <main>
      <section className="flex items-center justify-between">
        <div className="rounded-full bg-neutral-300 p-2 w-28 animate-pulse"></div>
        <div className="rounded-full bg-neutral-300 p-2 w-28 animate-pulse"></div>
        <div className="rounded-full bg-neutral-300 p-4 animate-pulse w-5 h-5"></div>
      </section>

      <section className="space-y-5 mt-5">
        <div>
          <div className="rounded-full bg-neutral-300 p-2 w-24 animate-pulse"></div>
          <div className="mt-2 rounded-lg bg-neutral-300 p-4 h-12 animate-pulse w-full"></div>
        </div>
        <div>
          <div className="rounded-full bg-neutral-300 p-2 w-24 animate-pulse"></div>
          <div className="mt-2 rounded-lg bg-neutral-300 p-4 h-12 animate-pulse w-full"></div>
        </div>

        <div className="rounded-lg bg-neutral-300 p-4 h-20 animate-pulse w-full"></div>
      </section>
      <div className="mt-20 rounded-lg bg-neutral-300 p-4 h-12 animate-pulse w-full"></div>
    </main>
  );
}
