# @vsirrr/seal

## 功能

使用 canvas 绘制公司公章、个人印章

## 使用方式

### 安装

```shell
npm i @vsirrr/seal
```

### demo

```html
<!-- html -->
<div>
  <canvas id="company"></canvas>
  <button id="btn1">saveSeal</button>
</div>
<div>
  <canvas id="person"></canvas>
  <button id="btn2">saveSeal</button>
</div>

<script src="xxx/dist/index.js"></script>
<script>
  const company = new Seal.Official('#company', {
    // 名称
    name: '公司名称公司名称公司名称',
    // 类型(可选)：1.公司公章 2.合同专用章
    type: '公司公章',
    // 安全码(可选)
    code: '1102311231231',
    // 是否显示内边线，默认为 false
    innerLine: true
  })
  btn1.onclick = function () {
    // saveSeal 调用的是 canvas 实例的 toDataURL() 方法，支持传参
    console.log('saveSeal company:', company.saveSeal())
  }

  const person = new Seal.Personal('#person', {
    // 姓名
    name: '张三',
    // 是否有边框，默认为 true
    border: true
  })
  btn2.onclick = function () {
    // saveSeal 调用的是 canvas 实例的 toDataURL() 方法，支持传参
    console.log('saveSeal person:', person.saveSeal())
  }
</script>

<!-- vue -->
<template>
  <canvas id="canvas"></canvas>
</template>

<script>
  import { Official } from '@vsirrr/seal'

  export default {
    mounted() {
      new Official('#canvas', options)
    }
  }
</script>

<!-- react -->
<script>
  import React, { useEffect } from 'react'
  import { Personal } from '@vsirrr/seal'

  export default function Seal() {
    useEffect(() => {
      new Personal('#canvas', options)
    })

    return <canvas id="canvas"></canvas>
  }
</script>
```
