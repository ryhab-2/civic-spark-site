import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

const SUPABASE_URL = "https://xrwyszdhoyrsoxuvcghk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyd3lzemRob3lyc294dXZjZ2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NjQ4NzYsImV4cCI6MjA3MTM0MDg3Nn0.A0K9Mf4sKb_xVGFCIAcXtx96HrmLG8nQvM-tmSm32Rk";

export const typedSupabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});