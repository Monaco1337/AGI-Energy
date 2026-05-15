import type { ContactPreference } from '@elo/core';

const LABEL: Record<ContactPreference, string> = {
  phone: 'Telefon',
  whatsapp: 'WhatsApp',
  email: 'E-Mail',
};

export function ContactBadge({ preference }: { preference?: ContactPreference }) {
  if (!preference) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-line" />
        Kein Kontaktwunsch
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink2">
      <span aria-hidden className="size-1.5 rounded-full bg-sage" />
      {LABEL[preference]}
    </span>
  );
}
