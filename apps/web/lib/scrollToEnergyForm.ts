const FORM_ID = 'energy-lead-form';

export function scrollToEnergyForm(): void {
  if (typeof document === 'undefined') return;
  document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export { FORM_ID as ENERGY_LEAD_FORM_ID };
