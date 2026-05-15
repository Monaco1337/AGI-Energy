'use client';

import { useEffect, useState } from 'react';
import { Button } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';

export function StickyMobileCta() {
  const [show, setShow] = useState(false);
  const label = energyLandingContent.stickyMobile.label;

  useEffect(() => {
    let visible = false;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? window.scrollY / total : 0;
      const next = ratio > 0.18;
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
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-burgundy/95 backdrop-blur-md p-2 shadow-premium">
        <Button type="button" variant="primary" size="lg" fullWidth onClick={scrollToEnergyForm}>
          {label}
        </Button>
      </div>
    </div>
  );
}
