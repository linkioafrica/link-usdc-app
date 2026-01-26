export default function Loading() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-neutral-300 p-4 animate-pulse w-5 h-5"></div>
        <div className="rounded-full bg-neutral-300 p-2 w-32 animate-pulse"></div>
        <div className="rounded-full bg-neutral-300 p-4 animate-pulse w-5 h-5"></div>
      </div>
      <div>
        <div className="mt-5 rounded-lg bg-neutral-300 p-4 h-32 animate-pulse w-full"></div>
        <div className="mt-5 rounded-lg bg-neutral-300 p-4 h-28 animate-pulse w-full"></div>
        <div className="mt-5 rounded-lg bg-neutral-300 p-4 h-28 animate-pulse w-full"></div>
      </div>
    </main>
  );
}
