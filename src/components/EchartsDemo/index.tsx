import React from 'react'
import ReactEcharts, { EChartsOption } from 'echarts-for-react'
import { a } from './a'
import b from './histogramdata1.json'
console.log('b', b)

const EchartsDemo = (props: any) => {
  // const xData: any = [-20, 0, 20]
  // const yData: any = [0, 50, 100, 150, 200, 250, 300]
  // const number = 280
  // const resData = new Array(number).fill('').map((item, index: number) => {
  //   const xItem = 20 - ((xData.at(-1) - xData[0]) / number) * index
  //   const yItem = ((yData.at(-1) - yData[0]) / number) * index
  //   return [xItem, yItem]
  // })
  // console.log('resData', resData)
  // const testData = a.reduce((pre: any, cur: any) => {
  //   const zen = cur.data
  //     .filter((item: any) => !item.is_virtual)
  //     .map((item: any) => {
  //       return [item.object_y, item.object_x,'green']
  //     })
  //   return [...pre, ...zen]
  // }, [])
  // for i in range(height):
  //   for j in range(width):
  //       # 由于数据分布问题，需要从右下角开始画，数据为正的在右边红色，负的在左边绿色，用HSV来处理颜色
  //       if data[i*width+j] > 0:
  //           ones[height-i-1][width-j-1] = (0, data[i*width+j]*255, 255)
  //       else:
  //           ones[height-i-1][width-j-1] = (60, -data[i*width+j]*255, 255)
  const ones = []
  const data = b['ChessboardContent']
  for (let i = 0; i <= b.Height; i++) {
    for (let j = 0; j < b.Width; j++) {
      if (data[i * b.Width + j] > 0) {
        ones.push([
          (b.Width - j - 1) * b.MeshWidth,
          (i + 1) * b.MeshHeight,
          `rgba(255,0,0,${data[i * b.Width + j]})`,
        ])
      } else if (data[i * b.Width + j] < 0) {
        ones.push([
          (b.Width - j - 1) * b.MeshWidth,
          (i + 1) * b.MeshHeight,
          `rgba(0,255,0,${-data[i * b.Width + j]})`,
        ])
      }
      // else {
      //   ones.push([60,-data[i*b.Width+j]*255,'green'])
      // }
    }
  }
  console.log(ones)
  return (
    <div>
      <ReactEcharts option={props.options([...ones])} style={{ width: 681, height: 910 }} />
    </div>
  )
}

export default EchartsDemo
