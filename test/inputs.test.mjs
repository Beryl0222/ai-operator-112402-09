import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("各方向指向真实成对采样", () => {
  assert.ok(d.directions.every(x=>x.pairs.every(([id,u,v])=>d.eventsData.some(e=>e.id===id)&&Number.isFinite(u)&&Number.isFinite(v))));
});

test("有极端饱和与未完整采样", () => {
  assert.ok(d.eventsData.some(e=>e.plus-e.minus>700)&&d.eventsData.some(e=>e.minus===null));
});

test("同一难例参与两个方向的不同契约", () => {
  assert.ok(d.directions.every(dir=>dir.pairs.some(r=>r[0]==='b')));
});
