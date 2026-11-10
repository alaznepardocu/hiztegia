import { createClient } from '@supabase/supabase-js';

// Valores PÚBLICOS: la seguridad la dan las políticas RLS de la base de datos.
// Copia aquí la URL del proyecto y la clave PUBLICABLE (antes "anon").
// La clave SECRETA (service_role) NUNCA va en este archivo.
export const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'TU_CLAVE_PUBLICABLE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
