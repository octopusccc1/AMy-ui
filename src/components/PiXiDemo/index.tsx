import React, { useEffect, useRef, useState } from 'react'
import * as PIXI from 'pixi.js'
import { Button } from 'antd'
// import './demo'
const logo = require('./cat.png')
const PiXiDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const app = new PIXI.Application({
      width: 200,
      height: 200,
      view: canvasRef.current || undefined,
      backgroundColor: 0xFFFFFFFF,
    })
    let sprite = PIXI.Sprite.from(logo);
    app.stage.addChild(sprite);

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    if(app.ticker){
      app.ticker.add((delta:any) => {
        elapsed += delta;
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      });
    }
    
    // // create a new Sprite from an image path.
    // const bunny = PIXI.Sprite.from('logo.jpeg')
   
    // // // center the sprite's anchor point
    // bunny.anchor.set(0.5)

    // // // move the sprite to the center of the screen
    // bunny.y = app.screen.height / 2
    // app.stage.addChild(bunny)
    // app.ticker
    // console.log(app)
   
  }, [])

  return (
    <div>
      <Button onClick={() => {}}>test</Button>
      {/* <div className="pixi-wrapper"></div> */}
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default PiXiDemo
