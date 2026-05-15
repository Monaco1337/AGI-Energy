// Top-Level Admin-Layout: nur Pass-Through.
// Auth-Gate sitzt im (authed)/layout.tsx, sodass /admin/login frei bleibt.
export default function AdminTopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
