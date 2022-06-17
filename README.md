# seed-cli
libs 提供基础能力
seed 主要功能
utils 赋能工具


pnpm install

monorepo 基于pnpm自带

发包工具使用changesets
patch 更新小版本号，代表fix补丁
minor 更新中版本号，代表小功能改动
major 更新大版本号，代表功能大跨步升级

发包步骤
pnpm changeset
pnpm versions
pnpm release


plan:
1. babel换esbuild
2. build打包优化配置
3. webpack执行oneOf includ等优化
4. 添加git流 提交git的时候直接发版