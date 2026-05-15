'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let visible = false;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? window.scrollY / total : 0;
      const next = ratio > 0.25;
      if (next !== visible) {
        visible = next;
        setShow(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 transition-transform ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link
        href="/energiecheck"
        className="flex items-center justify-center w-full h-14 rounded-elo bg-sage text-paper text-[17px] font-semibold shadow-eloLg hover:bg-sage2 transition-colors"
      >
        Energie-Check starten
      </Link>
    </div>
  );
}
