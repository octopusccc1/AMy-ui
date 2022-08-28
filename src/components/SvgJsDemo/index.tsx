import { Button } from 'antd'
import React, { useEffect } from 'react'
import { SVG } from '@svgdotjs/svg.js'
import './index.less'
const SvgJsDemo = () => {
  const realHeight = 300
  const virtualHeight = 300
  useEffect(() => {
    const draw = SVG()
      .addTo('#svgDemo')
      .size(300, 300)
    draw.line(0, 0, 100, 150).stroke({ width: 1, color: '#000' })
  }, [])
  return <div>
    <div id="svgDemo"></div>
    {/* <div className='map'>

   
    <div className='map3'></div>
    </div> */}
  </div>
}
export default SvgJsDemo
