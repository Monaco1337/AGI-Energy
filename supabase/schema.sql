-- Energy Lead OS – Supabase Schema (Skeleton, Phase 2)
-- Run with: supabase db reset --linked
-- Hinweis: RLS-Policies stehen in policies.sql.

create extension if not exists pgcrypto;

create table if not exists public.users (
  id text primary key,
  email text unique not null,
  name text not null,
  role text not null check (role in ('admin','sales','viewer')),
  password_hash text not null,
  created_at timestamptz not null default now(),
  failed_login_count int not null default 0,
  locked_until timestamptz,
  last_login_at timestamptz
);

create table if not exists public.leads (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null,
  source_details text,
  campaign_id text,
  utm_source text, utm_medium text, utm_campaign text,
  customer_type text not null,
  interests text[] not null,
  urgency text not null,
  has_invoice text not null,
  monthly_energy_costs text not null,
  owns_property text not null,
  contact_preference text,
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  postal_code text not null,
  city text,
  message text,
  legal_basis text not null,
  consent jsonb,
  lead_score int not null,
  lead_color text not null,
  lead_label text not null,
  score_reasons jsonb not null default '[]',
  recommended_action text not null,
  status text not null,
  assigned_to text,
  next_follow_up_at timestamptz,
  last_contact_at timestamptz,
  notes jsonb not null default '[]',
  contact_history jsonb not null default '[]',
  files jsonb not null default '[]',
  ai_opt_in boolean default false,
  ai_summary text,
  ai_suggested_action text,
  is_demo boolean default false
);

create index if not exists leads_color_idx on public.leads (lead_color);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_idx on public.leads (created_at desc);

create table if not exists public.research_prospects (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  company_name text not null,
  industry text not null,
  website text, city text, postal_code text,
  public_source_url text,
  energy_potential_score int not null default 0,
  relevance_label text,
  legal_review_status text not null,
  notes text,
  converted_lead_id text references public.leads(id),
  is_demo boolean default false
);

create table if not exists public.audit_log (
  id text primary key,
  created_at timestamptz not null default now(),
  actor_id text not null,
  actor_role text not null,
  action text not null,
  entity text not null,
  entity_id text not null,
  diff jsonb,
  ip_hash text,
  ua text,
  request_id text
);

create index if not exists audit_created_idx on public.audit_log (created_at desc);

create table if not exists public.events (
  id text primary key,
  created_at timestamptz not null default now(),
  type text not null,
  session_id text not null,
  step_id text, field_id text,
  audience text, variant_id text, experiment_id text,
  duration_ms int, meta jsonb,
  ip_hash text, ua_class text
);

create index if not exists events_step_idx on public.events (step_id);
create index if not exists events_type_idx on public.events (type);

alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.research_prospects enable row level security;
alter table public.audit_log enable row level security;
alter table public.events enable row level security;
