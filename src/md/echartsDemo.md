# EchartsDemo

## 何时使用

- 就这么用

## 基本使用

:::demo 基本使用。

```js
const Demo = () => {
  const options: EChartsOption = {
    backgroundColor: '#000',
    grid: {},
    xAxis: {
      // type: 'category',
      //  data: xData.map((item:any)=>item+'m'),
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}m',
      },
      //   axisLine: {
      //     show: false,
      //   },
    },
    yAxis: {
      // type: 'category',
      //  data: yData.map((item:any)=>item+'m'),
      position: 'right',
      splitLine: {
        show: false,
      },

      axisLine: {
        onZero: false,
        // show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}m',
      },
      //   axisLine: {
      //     show: false,
      //   },
    },
  }
  return (
    <EchartsDemo
      options={data =>
        Object.assign(options, {
          series: [
            {
              symbolSize: 6,
              data: data,
              type: 'scatter',
              itemStyle: {
                color: (val: any) => {
                  return val.data[2]
                },
              },
            },
          ],
        })
      }
    />
  )
}
```

:::
