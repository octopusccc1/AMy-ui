import { Button } from 'antd'
import React, { useEffect } from 'react'
import { SVG } from '@svgdotjs/svg.js'
import './index.less'
const SvgJsDemo = () => {
 
  useEffect(() => {
    const realHeight = 300 // unit m
    const virtualHeight = 300 //unit px
    const rate = virtualHeight / realHeight //unit px/m
    const inte = 50 //m
    const len = realHeight / inte
    const draw = SVG()
      .addTo('#svgDemo')
      .size(30, 300)
    // draw.line(x1, y1, x2, y2).stroke({ width: 1, color: isEmpty ? 'auto' : '#fff' })
    new Array(len).fill('').forEach((item, index) => {
      draw
        .rect(30, 20)
        .attr({ fill: '#f06' })
        .dy(rate * inte * index)
        .dx(0)
      draw
        .text(inte * (len - index) + 'm')
        .fill({ color: '#fff' })
        .dy(rate * inte * index+12)
        .dx(0)
        .font({ size: 8 })
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
