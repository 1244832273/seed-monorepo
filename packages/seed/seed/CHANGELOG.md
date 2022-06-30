# @seedltw/seed

## 0.1.5

### Patch Changes

- Updated dependencies
  - @seedltw/seed-webpack-dev@0.1.5
  - @seedltw/seed-webpack-build@0.0.4

## 0.1.4

### Patch Changes

- @seedltw/seed-webpack-build@0.0.3
- @seedltw/seed-webpack-dev@0.1.4

## 0.1.3

### Patch Changes

- 发布 create 命令 下载脚手架模板
- Updated dependencies
  - @seedltw/seed-create@0.0.1
  - @seedltw/seed-webpack-build@0.0.2
  - @seedltw/seed-webpack-dev@0.1.3
  - @seedltw/message-utils@0.0.2

## 0.1.2

### Patch Changes

- 将 loader 依赖放在 seed 里面
- Updated dependencies
  - @seedltw/seed-webpack-build@0.0.1
  - @seedltw/seed-webpack-dev@0.1.2

## 0.1.1

### Patch Changes

- 初始化
- Updated dependencies

  - @seedltw/seed-webpack-dev@0.1.1

  ### commander 命令

  usage(): 设置 usage 值
  command(): 定义一个命令名字
  description(): 描述
  option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以 , | 空格 做分隔。
  parse(): 解析命令行参数 argv
  action(): 注册一个 callback 函数
  version(): 终端输出版本号

  ### inquirer 基本用法

  type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor
  name: 存储当前问题回答的变量
  message：问题的描述
  default：默认值
  choices：列表选项，在某些 type 下可用，并且包含一个分隔符(separator)
  validate：对用户的回答进行校验
  filter：对用户的回答进行过滤处理，返回处理后的值
  when：根据前面问题的回答，判断当前问题是否需要被回答
  prefix：修改 message 默认前缀
  suffix：修改 message 默认后缀
