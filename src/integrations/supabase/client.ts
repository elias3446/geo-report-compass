// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://njvgexqauvhzcamywmya.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdmdleHFhdXZoemNhbXl3bXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NjU4MDMsImV4cCI6MjA2MDM0MTgwM30.KgzMl_NO7IcRo6gxsufj4yvdEfNf-XVhskHFcxypnj0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);