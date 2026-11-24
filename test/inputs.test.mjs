import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { curvatureColumn, curvatureInput } from '../inputs/factor-columns.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/factor-columns.json',import.meta.url),'utf8'));
test('共享预测头的曲率因子的格式与关联', () => {
  assert.equal(curvatureColumn('direct','g',0).length,data.rows);
  assert.equal(curvatureColumn('transpose','g',0).length,data.cols);
  assert.ok(data.rows*data.cols*8<data.workBytes);
  assert.ok((data.rows*data.cols)**2*8>data.workBytes*1000);
  assert.ok(data.protected[0][3]<data.protected.at(-1)[2]);
  assert.equal(data.exposure.reduce((a,b)=>a+b),1);
});
