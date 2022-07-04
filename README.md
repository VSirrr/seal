# @v/seal

使用 canvas 绘制公司公章、个人印章

```html
<canvas id="company"></canvas>
<canvas id="person"></canvas>

<script src="xxx/dist/index.js"></script>
<script>
new Seal.Official('#company', {
  // 名称
  name: '公司名称公司名称公司名称',
  // 类型(可选)：1.公司公章 2.合同专用章
  type: '公司公章',
  // 安全码(可选)
  code: '1102311231231',
  // 是否显示内边线，默认为 false
  innerLine: true,
 })

 new Seal.Personal('#person', {
  // 姓名
  name: '张三',
  // 是否有边框，默认为 true
  border: true,
 })
</script>
```
