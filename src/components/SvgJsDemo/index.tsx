import { Button } from 'antd'
import React, { useEffect } from 'react'
import { SVG } from '@svgdotjs/svg.js'
import './index.less'
const SvgJsDemo = () => {
  const realHeight = 300 // unit m
  const virtualHeight = 300 //unit px
  const rate = virtualHeight / realHeight //unit px/m
  const singleWhiteLen = 6 * rate //px
  const singleEmptyLen = 9 * rate //px
  const startX = 6
  const startY = 4.5
  const singleLineList = new Array(virtualHeight / (singleWhiteLen + singleEmptyLen))
    .fill('')
    .map((item, index) => {
      const white = [
        [startX, index * (singleWhiteLen + singleEmptyLen) + startY],
        [startX, index * singleEmptyLen + (index + 1) * singleWhiteLen + startY],
      ]
      const empty = [
        [startX, white[1][1]],
        [startX, singleEmptyLen + white[1][1]],
      ]
      return [white, empty]
    })
    .reduce((pre, cur) => {
      return [...pre, ...cur]
    }, [])
  useEffect(() => {
    const draw = SVG()
      .addTo('#svgDemo')
      .size(300, 300)
    singleLineList.forEach((item, index) => {
      const x1 = item[0][0]
      const y1 = item[0][1]
      const x2 = item[1][0]
      const y2 = item[1][1]
      const isEmpty = index % 2 === 1
      draw.line(x1, y1, x2, y2).stroke({ width: 1, color: isEmpty ? 'auto' : '#fff' })
    })
  }, [])
  return (
    <div>
      <div id="svgDemo" style={{ backgroundColor: '#18243b', height: 300 }}></div>
      {/* <div className='map'>

   
    <div className='map3'></div>
    </div> */}
    </div>
  )
}
export default SvgJsDemo
