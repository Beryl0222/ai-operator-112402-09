import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./factor-columns.json', import.meta.url), 'utf8'));
export function curvatureColumn(role, axis, index, revision = 1) {
  if (!['direct','transpose'].includes(role) || !['g','a'].includes(axis) || index<0 || index>=data.rank) {
    throw new RangeError('因子列越界');
  }
  const dim = (role === 'direct') === (axis === 'g') ? data.rows : data.cols;
  return Float64Array.from({length:dim}, (_, i) => {
    const scale = index >= data.rank - 5 ? 0.0001 : 0.15;
    return scale * Math.sin((i+3) * (index+1) * 0.071 + (axis==='g'?0:1) + revision);
  });
}
export function curvatureInput(kind, row) {
  const phase = kind==='gradient' ? 0.012 : kind===0 ? 0.026 : 0.04;
  return Float64Array.from({length:data.cols},(_,j)=>Math.cos((row*data.cols+j)*phase)/128);
}
