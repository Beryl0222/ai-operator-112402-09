# 端侧个性化的 Kronecker 曲率求解与共享权重步

这里的共享预测头的曲率因子是用于设备联调的合成资料。使用 Node.js 22。运行 `npm ci --offline` 核对依赖锁，`npm run inspect` 查看资料字段，`npm test` 检查资料格式及相互引用。检视脚本只读取元数据。

## 数据格式

真实参数 W 是行主序 r×c。角色 direct 的矩阵作用是 G·V·A，transpose 的作用是 (G'·Vᵀ·A')ᵀ，二者按 exposure 的正权加权加总。因子由 factor-columns.mjs 按每列提供低秩向量，定义为其外积之和与只读 diagonal 的和。步解决 1/2<Δ,HΔ>+<g,Δ> 最小化，H 为合计加阻尼 I。预算给 ||Δ||_H 上界，方向限制为指定 H 空间外的普通 Frobenius 线性功能上下界。inactive 的参数坐标禁止更新，不能把 gradient 的 inactive 条目移到别的别名。空交集为不可行。证据以目标间隙 absoluteGap、约束余量 constraintTol 与版本一致性验收。工作区只计设备拥有的动态内存及暂存输出，调用方保存的输入张量不计。factorFetch 统计实际取因子列次数。 diagonal 的每项是 direct 或 transpose 的 g 和 a 标量对角。在因子更正后，撤下列可以标记不参与更新，仍在合法保护域的坐标不得受一个无权角色约束。一个批次从同一身份读到的因子必须来自同一提交，不允许混合半批因子。

## 取数

`inputs/factor-columns.json` 保存标定、规格和调用记录。记录中的范围除明确说明外从零开始，使用半开区间。批量数组按调用记录列出的顺序交付。curvatureColumn(role,axis,index,revision) 读因子列，curvatureInput(kind,row) 读梯度或保护方向的行。
