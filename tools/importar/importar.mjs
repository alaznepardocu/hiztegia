// Importa los datos de JSONBin a Supabase. Ejecútalo en TU ordenador (usa la clave secreta).
//   npm install
//   copia .env.example a .env y rellénalo
//   npm run importar            (primera vez)
//   npm run reimportar          (borra las dos tablas y vuelve a importar: pierdes lo editado desde la web)
import { createClient } from '@supabase/supabase-js';
import { agruparPalabras, aAditzak } from './transformar.mjs';

const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error('Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en el archivo .env');
  process.exit(1);
}
const sb = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
console.log('Conectando a:', new URL(SUPABASE_URL).host);
const BINS = {
  hiztegia: '6acdd703ac6210605a2cbcf8',
  trinkoak: '6ad8eaa8ac6210605a4669ce',
  auxiliarrak: '6aedc320ffd5d16053abcf48',
};
const IKASTURTEA = 2026; // curso 2026-27
const AÑO = 2026;        // año de las fechas "06-oct", "05-nov"...

const bin = async (id) => {
  const r = await fetch(`https://api.jsonbin.io/v3/b/${id}?meta=false`);
  if (!r.ok) throw new Error(`JSONBin ${id}: HTTP ${r.status}`);
  return r.json();
};

async function subir(tabla, filas, onConflict) {
  for (let i = 0; i < filas.length; i += 500) {
    const lote = filas.slice(i, i + 500);
    const { error } = onConflict
      ? await sb.from(tabla).upsert(lote, { onConflict })
      : await sb.from(tabla).insert(lote);
    if (error) throw new Error(`${tabla}: ${error.message}`);
  }
  console.log(`${tabla}: ${filas.length} filas`);
}
try {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers: { apikey: SUPABASE_SECRET_KEY } });
  console.log('Conexión con Supabase OK, estado HTTP:', r.status);
} catch (e) {
  console.error('No se llega a Supabase:', e.cause ?? e);
  process.exit(1);
}
if (process.argv.includes('--reset')) {
  for (const tabla of ['aditzak', 'palabras']) {
    const { error } = await sb.from(tabla).delete().not('id', 'is', null);
    if (error) throw new Error(`No se pudo vaciar ${tabla}: ${error.message}`);
  }
  console.log('Tablas vaciadas');
}

const [hiztegia, trinkoak, auxiliarrak] = await Promise.all(Object.values(BINS).map(bin));
console.log(`JSONBin: ${hiztegia.length} palabras, ${trinkoak.length} trinkoak, ${auxiliarrak.length} auxiliarrak`);

await subir('palabras', agruparPalabras(hiztegia, { ikasturtea: IKASTURTEA, año: AÑO }), 'eu,maila,ikasturtea');
await subir('aditzak', aAditzak(trinkoak, auxiliarrak));
console.log('Importación terminada');
