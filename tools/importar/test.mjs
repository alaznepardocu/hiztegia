import assert from 'node:assert/strict';
import { aFecha, agruparPalabras, aAditzak } from './transformar.mjs';

assert.equal(aFecha('06-oct', 2026), '2026-10-06');
assert.equal(aFecha('05-NOV ', 2026), '2026-11-05');
assert.throws(() => aFecha('32-xyz', 2026));

const g = agruparPalabras([
  { eu: 'lasai', es: 'calma', maila: 'A1', data: '22-oct' },
  { eu: 'lasai', es: 'tranquilo/a', maila: 'A1', data: '03-nov' },
  { eu: 'lasai', es: 'calma', maila: 'A1', data: '10-nov' },   // significado repetido
  { eu: 'emazte', es: 'esposa', maila: 'A1', data: '06-oct' },
  { eu: 'emazte', es: 'mujer', maila: 'A2', data: '13-oct' },  // otro nivel: fila distinta
], { ikasturtea: 2026, año: 2026 });
assert.equal(g.length, 3);
assert.deepEqual(g.find(p => p.eu === 'lasai').es, ['calma', 'tranquilo/a']);
assert.equal(g.find(p => p.eu === 'lasai').data, '2026-10-22');   // gana la primera fecha

const v = aAditzak(
  [
    { konjugaioa: 'naiz', pertsona: 'ni', aditza: 'izan', denbora: 'orainaldia' },
    { konjugaioa: 'dut', pertsona: 'nik', aditza: 'ukan', denbora: 'orainaldia', objektu: 'singularra' },
  ],
  [{ aditza: 'nor-nork', konjugaioa: 'zaitut', nor: 'zu', nork: 'nik', denbora: 'orainaldia' }],
);
assert.deepEqual(v[0], { mota: 'nor', aditza: 'izan', denbora: 'orainaldia', nor: 'ni', nork: null, objektu: null, konjugaioa: 'naiz' });
assert.equal(v[1].mota, 'nork');
assert.equal(v[1].nork, 'nik');
assert.equal(v[1].objektu, 'singularra');
assert.equal(v[2].mota, 'nor-nork');
console.log('transformar OK');
