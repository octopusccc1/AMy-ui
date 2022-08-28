import React from 'react'
import ReactEcharts, { EChartsOption } from 'echarts-for-react'
import { a } from './a'

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
  const testData = a.reduce((pre: any, cur: any) => {
    const zen = cur.data
      .filter((item: any) => !item.is_virtual)
      .map((item: any) => {
        return [item.object_y, item.object_x,'green']
      })
    return [...pre, ...zen]
  }, [])
  return (
    <div>
      <ReactEcharts option={props.options(testData)} style={{ width: 681, height: 910 }} />
    </div>
  )
}

export default EchartsDemo
