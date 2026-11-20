import { createClient } from '@supabase/supabase-js'

const url = import.meta.env['VITE_SUPABASE_URL'] as string | undefined
const key = (import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ?? import.meta.env['VITE_SUPABASE_ANON_KEY']) as string | undefined

// Null until the Supabase keys are configured, so the rest of the site still works without them.
export const supabase = url && key ? createClient(url, key) : null
