# 移动手势校准的成对 Focal 曲率归约

项目资料使用可独立读写的 JSON。Node.js 22.23.4 下运行 `npm ci --offline` 准备环境，然后运行 `npm run inspect` 检查合成数据字段，运行 `npm test` 校验样本引用及格式。

## 输入契约

每对给 x+、x-、weight 和方向投影 d+、d-。在方向 t 时 q(t)=(x++t*d+)-(x-+t*d-)。p(t)=sigmoid(q(t))，单样本损失是 -(1-p)^γ log(p)。每方向把当前已齐有效对的损失和在 t=0 的一、二阶导按 weight 求平均。不同方向的样本资格与权重由各自清单独立规定。负曲率不得套正 Hessian 的更新公式；curvMin、stepBound 与最大可用导数区间宽度见设备的方向规则。兼容规则仅在验证通过后允许调用者按当前证据选取步长。

## 资料读取

样本位于 `inputs/session.json`，其中 `events` 是按到达顺序记下的操作，编号从零开始。pair 指已送达样本对的 ID，missing 声明该配对不可取得，assess 和 propose 分别请求评估或提交方向证据。pairs 条目依次是配对 ID、正与负的方向投影。
