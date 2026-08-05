import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'POC' };

export default function PocPage() {
  return (
    <main className="container-content py-20">
      <h1 className="text-display-lg font-semibold">HOMEWORK boot check</h1>
      <p className="mt-4 text-slateink-muted">Next.js 15 + React 19 + Tailwind 3 rendering correctly.</p>
      <button className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover">
        Book Free Consultation
      </button>
    </main>
  );
}
