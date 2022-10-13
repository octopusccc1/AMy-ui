import React, { useEffect, useRef, useState } from 'react'
import * as PIXI from 'pixi.js'
import { Button, Form, Input } from 'antd'
import { useKeyPress } from '../../hooks'
import { useForm } from 'antd/es/form/Form'
require('./images/wst.normal.png')
require('./images/monster.normal.png')
const screenHeight = 300
const screenWidth = 300
// console.log('monster',monster)
const data = require('./images/wst.json')
const data2 = require('./images/monster.json')
const SPEED = 10
// let Application = PIXI.Application,
//   Container = PIXI.Container,
//   TextureCache = PIXI.utils.TextureCache,
//   Sprite = PIXI.Sprite,
//   Rectangle = PIXI.Rectangle
// console.log('useKeyPress',useKeyPress)
enum EPostion {
  left = 'left',
  right = 'right',
  front = 'front',
  after = 'after',
}

type TPosition = {
  x: number | undefined
  y: number | undefined
}

const PiXiDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [position, setPosition] = useState<EPostion>(EPostion.right)
  const appRef = useRef<PIXI.Application | null>(null)
  const loadPRef = useRef<any>(null)
  const animatedSpriteRef = useRef<any>(null)
  const curPosition = useRef<TPosition>({ x: 0, y: 0 })

  const speedRef = useRef<number>(SPEED)

  useEffect(() => {
    appRef.current = new PIXI.Application({
      width: screenWidth,
      height: screenHeight,
      view: canvasRef.current || undefined,
    })
    loadPRef.current = PIXI.Loader.shared.add(data).add(data2)
    return ()=>{
      // PIXI.Loader.shared.reset()
    }
  }, [])
  const getMonster = (position: EPostion, initX: number, initY: number) => {
    loadPRef.current.load(setup)
    function setup(res: any) {
      const getPosition = (sheet: any, postion: string) => {
        return new PIXI.AnimatedSprite(sheet.animations[`monster_${postion}`])
      }
      const sheet: any = PIXI.Loader.shared.resources[data2].spritesheet

      const postionInstanceMap = {}
      ;['left', 'right', 'front', 'after'].forEach(item => {
        postionInstanceMap[item] = getPosition(sheet, item)
      })
      let animatedSprite = postionInstanceMap[position]
      // animatedSprite.scale.set(5)
      animatedSprite.animationSpeed = 0.1
      animatedSprite.x = initX
      animatedSprite.y = initY
      animatedSprite.play()
      let p = position === EPostion.front
      appRef.current?.stage.addChild(animatedSprite)

      appRef.current?.ticker.add(() => {
        if (animatedSprite.y >= screenHeight - 16) {
          appRef.current?.stage.removeChild(animatedSprite)
          animatedSprite = postionInstanceMap[EPostion.after]
          animatedSprite.animationSpeed = 0.1
          animatedSprite.y = screenHeight - 16
          animatedSprite.x = initX
          animatedSprite.play()
          appRef.current?.stage.addChild(postionInstanceMap[EPostion.after])
          p = false
        }
        if (p) {
          animatedSprite.y++
        } else {
          animatedSprite.y--
        }
        if (animatedSprite.y <= 0) {
          appRef.current?.stage.removeChild(animatedSprite)
          animatedSprite = postionInstanceMap[EPostion.front]
          animatedSprite.animationSpeed = 0.1
          animatedSprite.y = 0
          animatedSprite.x = initX
          animatedSprite.play()
          appRef.current?.stage.addChild(postionInstanceMap[EPostion.front])
          p = true
        }
       
        if (
          Math.abs(animatedSpriteRef?.current?.x - animatedSprite?.x) < 8 &&
          Math.abs(animatedSpriteRef?.current?.y - animatedSprite?.y) < 8
        ) {
          appRef.current?.ticker.stop()
        }
      })
    }
  }

  const getAnimatedSprite = (postion: EPostion) => {
    loadPRef.current.load(setup)
    function setup(res: any) {
      const getPosition = (sheet: any, postion: string) => {
        return new PIXI.AnimatedSprite(sheet.animations[`characters_${postion}`])
      }
      let sheet: any = PIXI.Loader.shared.resources[data].spritesheet

      const postionInstanceMap = {}
      ;['left', 'right', 'front', 'after'].forEach(item => {
        postionInstanceMap[item] = getPosition(sheet, item)
      })
      const animatedSprite = postionInstanceMap[postion]
      // animatedSprite.scale.set(5)
      animatedSprite.animationSpeed = 0.1
      animatedSprite.play()
      appRef.current?.stage.removeChild(animatedSpriteRef.current)
      animatedSpriteRef.current = animatedSprite
      animatedSpriteRef.current.x = curPosition.current.x
      animatedSpriteRef.current.y = curPosition.current.y
      appRef.current?.stage.addChild(animatedSprite)
    }
  }
  useEffect(() => {
    new Array(10)
      .fill('')
      .map(item => {
        return {
          x: screenWidth * Math.random(),
          y: screenHeight * Math.random(),
          postion: Math.random() > 0.5 ? EPostion.front : EPostion.after,
        }
      })
      .forEach(item => {
        getMonster(item.postion, item.x, item.y)
      })
  }, [])
  useEffect(() => {
    getAnimatedSprite(position)
  }, [position])

  useKeyPress('leftarrow', () => {
    setPosition(EPostion.left)
    if (animatedSpriteRef.current) {
      animatedSpriteRef.current.x -= speedRef.current
      curPosition.current.x = animatedSpriteRef.current.x
      curPosition.current.y = animatedSpriteRef.current.y
    }

    // getAnimatedSprite(EPostion.left)
  })
  useKeyPress('rightarrow', () => {
    setPosition(EPostion.right)
    if (animatedSpriteRef.current) {
      animatedSpriteRef.current.x += speedRef.current
      curPosition.current.x = animatedSpriteRef.current.x
      curPosition.current.y = animatedSpriteRef.current.y
    }
  })
  useKeyPress('uparrow', () => {
    setPosition(EPostion.after)
    if (animatedSpriteRef.current) {
      animatedSpriteRef.current.y -= speedRef.current
      curPosition.current.x = animatedSpriteRef.current.x
      curPosition.current.y = animatedSpriteRef.current.y
    }
  })
  useKeyPress('downarrow', () => {
    setPosition(EPostion.front)
    if (animatedSpriteRef.current) {
      animatedSpriteRef.current.y += speedRef.current
      curPosition.current.x = animatedSpriteRef.current.x
      curPosition.current.y = animatedSpriteRef.current.y
    }
  })
  const [form] = useForm()
  return (
    <div>
      <Form
        form={form}
        initialValues={{
          speed: SPEED,
        }}
        onFieldsChange={() => {
          speedRef.current = Number(form.getFieldValue('speed'))
        }}
      >
        <Form.Item name="speed" label="player速度">
          <Input style={{ width: 200 }} />
        </Form.Item>
      </Form>
      <Button onClick={() => {}}>test</Button>
      {/* <div className="pixi-wrapper"></div> */}
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default PiXiDemo
