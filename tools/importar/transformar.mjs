// Funciones puras: pasan los datos de JSONBin a las filas de Supabase.

const MESES = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };

/** '06-oct' -> '2026-10-06' */
export function aFecha(txt, año) {
  const [d, m] = String(txt).trim().toLowerCase().split('-');
  const mes = MESES[m];
  if (mes === undefined || !Number(d)) {
    throw new Error(`Fecha no reconocida: "${txt}"`);
  }
  return new Date(Date.UTC(año, mes, Number(d))).toISOString().slice(0, 10);
}

/** Une las palabras repetidas (mismo euskera y nivel) en una sola con varios significados. */
export function agruparPalabras(record, { ikasturtea, año }) {
  const mapa = new Map();
  for (const r of record) {
    const eu = r.eu.trim();
    const maila = r.maila.trim();
    const clave = `${eu.toLowerCase()}|${maila}`;
    const fila = mapa.get(clave) ?? { eu, es: [], maila, ikasturtea, data: aFecha(r.data, año) };
    const es = r.es.trim();
    if (!fila.es.includes(es)) fila.es.push(es);
    mapa.set(clave, fila);
  }
  return [...mapa.values()];
}

/** trinkoak + auxiliarrak -> tabla unificada "aditzak" */
export function aAditzak(trinkoak, auxiliarrak) {
  const a = trinkoak.map(r => r.objektu
    ? { mota: 'nork', aditza: r.aditza, denbora: r.denbora, nork: r.pertsona, nor: null, objektu: r.objektu, konjugaioa: r.konjugaioa }
    : { mota: 'nor',  aditza: r.aditza, denbora: r.denbora, nor: r.pertsona, nork: null, objektu: null,     konjugaioa: r.konjugaioa });
  const b = auxiliarrak.map(r => ({
    mota: 'nor-nork', aditza: r.aditza, denbora: r.denbora, nor: r.nor, nork: r.nork, objektu: null, konjugaioa: r.konjugaioa,
  }));
  return [...a, ...b];
}
