import { createClient } from '@supabase/supabase-js';

// Valores PÚBLICOS: la seguridad la dan las políticas RLS de la base de datos.
// Copia aquí la URL del proyecto y la clave PUBLICABLE (antes "anon").
// La clave SECRETA (service_role) NUNCA va en este archivo.
export const SUPABASE_URL = 'https://krmctginzffmwpllxtwx.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_sNeSzLwh4NHeT5vWnqZ9DA_JqWj5L2-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
