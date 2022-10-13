# Button 按钮

## 何时使用

- antd的按钮

## 基本使用

:::demo 基本使用。

```js
const Demo= () =>{
  return(<Button type="primary" onClick={()=>{
    alert(1)
  }}>点击测试一下</Button>)
}
```
:::

:::demo 基本使用2。

```js
const Demo= () =>{
  return(<Button type="primary" onClick={()=>{
    alert(2)
  }}>点击测试一下</Button>)
}
```
:::


## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | Boolean | false |
