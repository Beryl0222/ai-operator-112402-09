import {readFileSync} from 'node:fs';
import * as input from './inputs/factor-columns.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/factor-columns.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'共享预测头的曲率因子',首项:source['rows'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
