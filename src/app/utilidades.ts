import type { Hitz } from './hiztegia';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** '2026-10-06' -> '06-oct' (mismo aspecto que antes) */
export function formatearFecha(iso: string): string {
  const [, mes, dia] = iso.split('-');
  const nombre = MESES[Number(mes) - 1];
  return nombre && dia ? `${dia}-${nombre}` : iso;
}

/** 2026 -> '2026-27' */
export function etiquetaIkasturtea(ikasturtea: number): string {
  return `${ikasturtea}-${String(ikasturtea + 1).slice(-2)}`;
}

/** Curso en el que estamos: de septiembre a diciembre empieza este año; el resto del año, el anterior. */
export function ikasturteaPorDefecto(hoy = new Date()): number {
  return hoy.getMonth() >= 8 ? hoy.getFullYear() : hoy.getFullYear() - 1;
}

/** Minúsculas, sin tildes (conserva la ñ), sin signos de puntuación y sin espacios de más. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .trim()
    .replace(/ñ/g, '__n__')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/__n__/g, 'ñ')
    .replace(/[¿?¡!.,;:()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "trabajador/a" -> ["trabajador", "trabajadora"];  "compañero/a de trabajo" -> las dos frases completas */
function variantesDeGenero(texto: string): string[] {
  const m = texto.match(/(\S+?)\/a(?=\s|$)/);
  if (!m) return [];
  const base = m[1];
  const femenino = base.endsWith('o') ? base.slice(0, -1) + 'a' : base + 'a';
  return [texto.replace(m[0], base), texto.replace(m[0], femenino)];
}

/** Todas las respuestas que se darán por buenas para una lista de significados. */
export function formasValidas(textos: string[]): Set<string> {
  const set = new Set<string>();
  for (const t of textos) {
    set.add(normalizar(t));
    for (const v of variantesDeGenero(t)) set.add(normalizar(v));
    for (const parte of t.split('/')) {            // "actor/actriz", "hilabete / hil"
      const n = normalizar(parte);
      if (n.length >= 3) set.add(n);
    }
  }
  return set;
}

export function esCorrecta(aceptadas: string[], respuesta: string): boolean {
  return formasValidas(aceptadas).has(normalizar(respuesta));
}

/** Une las palabras con el mismo euskera (p. ej. de niveles distintos) sumando sus significados. */
export function agruparPorEu(palabras: Hitz[]): Hitz[] {
  const mapa = new Map<string, Hitz>();
  for (const p of palabras) {
    const clave = normalizar(p.eu);
    const previa = mapa.get(clave);
    mapa.set(clave, previa
      ? {
          ...previa,
          es: [...new Set([...previa.es, ...p.es])],
          eu_alt: [...new Set([...(previa.eu_alt ?? []), ...(p.eu_alt ?? [])])],
        }
      : p);
  }
  return [...mapa.values()];
}
