-- RLS-Policies (Skeleton).
-- In Phase 2 werden Service-Role-Pfade ergänzt; in Phase 1 läuft das System
-- mit dem JSON-Adapter und benötigt diese Policies nicht zur Laufzeit.

create policy if not exists leads_admin_all on public.leads
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists research_admin_all on public.research_prospects
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists audit_admin_all on public.audit_log
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists events_insert_anon on public.events
  for insert with check (true);

create policy if not exists events_select_admin on public.events
  for select using (auth.role() = 'service_role');
